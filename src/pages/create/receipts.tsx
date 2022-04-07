import React, { useEffect, useState } from 'react'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Button } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetCustomers from '../../api/queries/useGetCustomers'
import useGetReceiptNum from '../../api/queries/useGetReceiptNum'
import useGetItems from '../../api/queries/useGetItems'
import {
   Container,
   InputsWrapper,
   ItemsWrapper,
   StyledRow,
   TextFieldWrapper,
   StyledButton,
   ActionsWrapper,
   Row,
} from '../../components/create/Elements'
import DatePicker from '../../components/datePicker'
import { receiptTypes } from '../../dummy'
import { ConstructionOutlined } from '@mui/icons-material'
import { isGreaterThanOne } from '../../helpers/isGreaterThanOne'
import { isBetweenZeroAndOne } from '../../helpers/isBetweenZeroAndOne'
import StyledTable from '../../components/table'
import { GridRowProps, GridColumns, GridActionsCellItem, GridValueFormatterParams } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const calcNetAmount = (qty: number, price: number, percent = 0) => {
   const total = qty * price
   const discount = qty * price * percent
   return total - discount
}

export default function CreateReceipts() {
   const [rows, setRows] = useState<any>([])
   const columns: GridColumns = [
      {
         field: 'itemName',
         headerName: 'Item Name',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
      },
      {
         field: 'qty',
         headerName: 'Quantity',
         flex: 1,
         headerClassName: 'table--header',
         // editable: true
         type: 'number',
      },
      {
         field: 'unitPrice',
         headerName: 'Unit Price',
         flex: 1,
         headerClassName: 'table--header',
         type: 'number',
         // editable: true
      },
      {
         field: 'unitPercent',
         headerName: 'Unit Percent',
         flex: 1,
         headerClassName: 'table--header',
         type: 'number',
         valueFormatter: (params: GridValueFormatterParams) => {
            const valueFormatted = Number((params.value as number) * 100).toLocaleString()
            return `${valueFormatted} %`
            // editable: true
         },
      },
      {
         field: 'netAmount',
         headerName: 'Net Amount',
         flex: 1,
         headerClassName: 'table--header',
         type: 'number',
      },
      // {
      //    field: '__v',
      //    headerName: 'Item Value',
      //    flex: 1,
      //    headerClassName: 'table--header',
      //    // editable: true
      // },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 200,
         getActions: (data: any) => [
            <GridActionsCellItem
               key="edit"
               icon={<EditIcon />}
               label="Edit"
               // onClick={() => handleUpdate(data)}
               disabled={false}
            />,
            <GridActionsCellItem
               key="delete"
               icon={<DeleteIcon />}
               label="Delete"
               // onClick={() => handleDelete(data.id)}
               disabled={false}
            />,
         ],
         headerClassName: 'table--header-actions table--header',
      },
   ]

   const {
      value: customerCode,
      valueIsValid: customerCodeIsValid,
      inputChangeHandler: customerCodeChangeHandler,
   } = useInput(isNotEmpty)

   const [receiptNum, setReceiptNum] = useState<string>('')
   const today = new Date()
   const [type, setType] = useState<string>(receiptTypes[0])
   const [customerName, setCustomerName] = useState<string>('')

   const {
      value: itemCode,
      valueIsValid: itemCodeIsValid,
      inputChangeHandler: itemCodeChangeHandler,
   } = useInput(isNotEmpty)

   const { value: itemId, valueIsValid: itemIdIsValid, setValue: setId } = useInput(isNotEmpty)

   const { value: qty, valueIsValid: qtyIsValid, setValue: setQty } = useInput(isGreaterThanOne)
   const {
      value: netAmount,
      valueIsValid: netAmountIsValid,
      setValue: setNetAmount,
   } = useInput(isGreaterThanOne)

   const {
      value: unitPrice,
      valueIsValid: unitPriceIsValid,
      setValue: setUnitPrice,
   } = useInput(isGreaterThanOne)

   const {
      value: unitPercent,
      valueIsValid: unitPercentIsValid,
      setValue: setUnitPercent,
   } = useInput(isBetweenZeroAndOne)

   const [itemName, setItemName] = useState<string>('')

   const { data: customersData } = useGetCustomers()
   const { data: receiptNumData } = useGetReceiptNum()
   const { data: itemsData } = useGetItems()
   const customers = customersData?.data
   const receiptNumber = receiptNumData?.data
   const items = itemsData?.data

   const formIsValid =
      customerCodeIsValid && itemCodeIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const handleDateChange = (value: string | null) => {}

   const handleUnitPercentChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isBetweenZeroAndOne(e.target.value)) {
         setUnitPercent(e.target.value)
      }
   }

   const handleQtyChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isGreaterThanOne(e.target.value)) {
         setQty(e.target.value)
      }
   }

   const handleUnitPriceChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (isGreaterThanOne(e.target.value)) {
         setUnitPrice(e.target.value)
      }
   }

   const handleAddItem = () => {
      if (formIsValid) {
         const row = rows.find((item: any) => item.itemId === itemId)
         if (row) return
         setRows((prev: any) => [...prev, { itemId, itemName, qty, unitPrice, unitPercent, netAmount }])
         return
      }
   }

   console.log(rows)

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
      setCustomerName('')
      return
   }, [customers, customerCode])

   useEffect(() => {
      const item = items?.find((item) => item.itemCode === itemCode)
      if (item) {
         setItemName(item.itemName)
         setUnitPrice(item.unitPrice.toString())
         setUnitPercent(item.unitPercent.toString())
         setId(item.itemId)
         return
      }
      setItemName('')
      setUnitPrice('')
      setUnitPercent('')
      setId('')
      return
   }, [items, itemCode, setUnitPrice, setUnitPercent, setId])

   useEffect(() => {
      if (qty && unitPrice) {
         setNetAmount(calcNetAmount(+qty, +unitPrice, +unitPercent).toString())
      }
   }, [qty, unitPrice, unitPercent, setNetAmount])

   useEffect(() => {
      if (receiptNumber) {
         setReceiptNum(receiptNumber.toString())
      }
   }, [receiptNumber])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <Row width={1} maxWidth={400}>
                  <TextFieldWrapper flex={1}>
                     <TextField
                        variant="outlined"
                        label="Customer code"
                        size="small"
                        required
                        value={customerCode}
                        onChange={customerCodeChangeHandler}
                        fullWidth
                     />
                  </TextFieldWrapper>
                  <TextFieldWrapper flex={1.5}>
                     <TextField
                        variant="outlined"
                        label="Customer name"
                        size="small"
                        required
                        value={customerName}
                        disabled
                        fullWidth
                     />
                  </TextFieldWrapper>
               </Row>

               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 120,
                        sm: 200,
                     },
                  }}
               >
                  <TextField
                     variant="outlined"
                     label="Receipt Num"
                     size="small"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={receiptNum}
                     onChange={(e) => setReceiptNum(e.target.value)}
                     disabled
                     fullWidth
                  />
               </TextFieldWrapper>
            </StyledRow>
            {/* 2nd row */}
            <StyledRow>
               <TextFieldWrapper width={1} maxWidth={400}>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Receipt Type</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Receipt Type"
                        onChange={(e) => setType(e.target.value as string)}
                     >
                        {receiptTypes.map((type) => (
                           <MenuItem key={type} value={type}>
                              {type}
                           </MenuItem>
                        ))}
                        {/* <MenuItem key="none" value="">
                           <em>None</em>
                        </MenuItem> */}
                     </Select>
                  </FormControl>
               </TextFieldWrapper>
               <TextFieldWrapper
                  width={1}
                  sx={{
                     maxWidth: {
                        xs: 120,
                        sm: 200,
                     },
                  }}
               >
                  <DatePicker value={today.toString()} onChange={handleDateChange} />
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>

         <Divider />

         <ItemsWrapper>
            <Row>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Item Code"
                     size="small"
                     required
                     value={itemCode}
                     onChange={itemCodeChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 2 }}>
                  <TextField
                     variant="outlined"
                     label="Item Name"
                     size="small"
                     required
                     value={itemName}
                     fullWidth
                     disabled
                  />
               </TextFieldWrapper>
            </Row>
            <Row>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Quantity"
                     size="small"
                     required
                     value={qty}
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     onChange={handleQtyChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Price"
                     size="small"
                     required
                     type="number"
                     inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                     value={unitPrice}
                     onChange={handleUnitPriceChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
               <TextFieldWrapper sx={{ flex: 1 }}>
                  <TextField
                     variant="outlined"
                     label="Unit Percent"
                     size="small"
                     required
                     type="number"
                     inputProps={{
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        step: '0.01',
                        min: '0',
                        max: '1',
                     }}
                     value={unitPercent}
                     onChange={handleUnitPercentChangeHandler}
                     fullWidth
                  />
               </TextFieldWrapper>
            </Row>

            <ActionsWrapper sx={{ flex: 1 }}>
               <StyledButton
                  variant="contained"
                  size="small"
                  color="primary"
                  fullWidth
                  onClick={handleAddItem}
               >
                  Add
               </StyledButton>
            </ActionsWrapper>
         </ItemsWrapper>
         <Divider />
         <StyledTable rows={rows} columns={columns} loading={false} getRowId={(row) => row.itemId} />
      </Container>
   )
}
