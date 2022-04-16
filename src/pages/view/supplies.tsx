import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { TextField, FormControl, MenuItem, InputLabel, Divider } from '@mui/material'
import Select from '@mui/material/Select'

import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetSuppliers from '../../api/queries/useGetSuppliers'
import useGetSupplyById from '../../api/queries/useGetSupplyById'
import useGetItems from '../../api/queries/useGetItems'
import {
   Container,
   InputsWrapper,
   StyledRow,
   TextFieldWrapper,
   Row,
   TableWrapper,
} from '../../components/create/Elements'
import DateTimePicker from '../../components/dateTimePicker'
import { supplyTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import SupplyItemsTable from '../../components/table/view/ReceiptItemsTable'

const calcNetAmount = (qty: number, price: number, percent = 0): number => {
   const total = qty * price
   const discount = qty * price * percent
   return total - discount
}

export interface Row {
   id: number
   itemId: string
   itemName: string
   itemCode?: string
   qty: string
   unitPrice: string
   unitPercent: number
   netAmount: number
}

export default function ViewSupply() {
   const [rows, setRows] = useState<Row[]>([])
   const [total, setTotal] = useState<number>(0)
   const [date, setDate] = useState<Date | null>(null)
   const [supplyType, setSupplyType] = useState<string>(supplyTypes[0])

   const { supplyId } = useParams()

   const {
      value: supplierCode,

      setValue: setSupplierCode,
      inputChangeHandler: supplierCodeChangeHandler,
      inputBlurHandler: supplierCodeBlurHandler,
      inputError: supplierCodeError,
   } = useInput(isNotEmpty)

   const {
      value: supplierName,

      setValue: setSupplierName,
      inputChangeHandler: supplierNameChangeHandler,
      inputBlurHandler: supplierNameBlurHandler,
      inputError: supplierNameError,
   } = useInput(isNotEmpty)

   const { value: supplyNum, setValue: setSupplyNum } = useDisableInput(isGreaterThanZero)

   const { data: suppliersData, isFetching: fetchingSuppliers } = useGetSuppliers()

   const { data: supplyData, isFetching: fetchingSupply } = useGetSupplyById(supplyId!)

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()

   const suppliers = suppliersData?.data
   const items = itemsData?.data

   const loading = fetchingSuppliers || fetchingItems || fetchingSupply

   const handleDateChange = (value: Date | null) => {}

   useEffect(() => {
      const supplier = suppliers?.find((supplier) => supplier.supplierCode === supplierCode)
      if (supplier) {
         setSupplierName(supplier.supplierName)
         return
      }
   }, [suppliers, supplierCode, setSupplierName])

   useEffect(() => {
      if (rows.length > 0) {
         const total = rows
            .map((row) => +row.netAmount)
            .reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
         setTotal(total)
         return
      }
      setTotal(0)
   }, [rows])

   useEffect(() => {
      if (supplyData) {
         const {
            data: { items: editItems, supplyDate, supplyNum, supplyType, supplierName },
         } = supplyData

         setSupplyNum(supplyNum.toString())

         const newItems = editItems.map((item, index) => ({
            id: index + 1,
            itemId: item.itemId,
            itemName: item.itemName,
            itemCode: items ? items.find((it) => it.itemName === item.itemName)?.itemCode : '',
            qty: item.qty.toString(),
            unitPrice: item.unitPrice.toString(),
            unitPercent: item.unitPercent,
            netAmount: calcNetAmount(item.qty, item.unitPrice, item.unitPercent),
         }))
         setRows(newItems)
         setSupplyType(supplyType)
         setDate(supplyDate)
         const supplier = suppliers?.find((supplier) => supplier.supplierName === supplierName)
         if (supplier) {
            setSupplierCode(supplier.supplierCode)
         }
      }
   }, [suppliers, items, supplyData, setSupplierCode, setSupplierName, setSupplyNum])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <Row width={1} maxWidth={400}>
                  <TextFieldWrapper flex={1}>
                     <TextField
                        variant="outlined"
                        label="Supplier code"
                        size="small"
                        value={supplierCode}
                        onChange={supplierCodeChangeHandler}
                        onBlur={supplierCodeBlurHandler}
                        error={supplierCodeError}
                        helperText={supplierCodeError && `This field is required`}
                        fullWidth
                        disabled
                     />
                  </TextFieldWrapper>
                  <TextFieldWrapper flex={1.5}>
                     <TextField
                        variant="outlined"
                        label="Supplier name"
                        size="small"
                        value={supplierName}
                        onChange={supplierNameChangeHandler}
                        onBlur={supplierNameBlurHandler}
                        error={supplierNameError}
                        helperText={supplierNameError && `This field is required`}
                        fullWidth
                        disabled
                     />
                  </TextFieldWrapper>
               </Row>

               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 250,
                        sm: 250,
                     },
                  }}
               >
                  <TextField
                     variant="outlined"
                     label="Supply Num"
                     size="small"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={supplyNum}
                     onChange={(e) => setSupplyNum(e.target.value)}
                     disabled
                     fullWidth
                  />
               </TextFieldWrapper>
            </StyledRow>
            {/* 2nd row */}
            <StyledRow>
               <TextFieldWrapper width={1} maxWidth={400}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Supply Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={supplyType}
                        label="Supply Type"
                        onChange={(e) => setSupplyType(e.target.value as string)}
                        disabled
                     >
                        {supplyTypes.map((type) => (
                           <MenuItem key={type} value={type}>
                              {type}
                           </MenuItem>
                        ))}
                     </Select>
                  </FormControl>
               </TextFieldWrapper>
               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 250,
                        sm: 250,
                     },
                  }}
               >
                  <DateTimePicker value={date} onChange={handleDateChange} />
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>

         <Divider />

         <TableWrapper>
            <SupplyItemsTable rows={rows} total={total} loading={loading} />
         </TableWrapper>
      </Container>
   )
}
