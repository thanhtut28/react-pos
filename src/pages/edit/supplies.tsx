import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useHotkeys } from 'react-hotkeys-hook'
import { TextField, FormControl, MenuItem, InputLabel, Divider, Box } from '@mui/material'
import Select from '@mui/material/Select'
import useMessageModal from '../../hooks/useMessageModal'
import useInput from '../../hooks/useInput'
import useDisableInput from '../../hooks/useDisableInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetSuppliers from '../../api/queries/useGetSuppliers'
import useGetSupplyById from '../../api/queries/useGetSupplyById'
import useGetItems from '../../api/queries/useGetItems'
import { useUpdateSupply } from '../../api/mutations/supply'
import {
   Container,
   InputsWrapper,
   ItemsWrapper,
   StyledRow,
   TextFieldWrapper,
   StyledButton,
   ActionsWrapper,
   Row,
   GridItemOne,
   GridItemTwo,
   Flex,
   SubmitActionsWrapper,
   TableWrapper,
} from '../../components/create/Elements'
import DateTimePicker from '../../components/dateTimePicker'
import { supplyTypes } from '../../dummy'
import { isGreaterThanZero } from '../../helpers/isGreaterThanZero'
import { isPercentage } from '../../helpers/isPercentage'
import SupplyItemsTable from '../../components/table/create/ReceiptItemsTable'
import { isValidQty } from '../../helpers/isValidQty'
import WarningModal from '../../components/warningModal'
import MessageModal from '../../components/messageModal'

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

export default function EditSupply() {
   const [rows, setRows] = useState<Row[]>([])
   const [total, setTotal] = useState<number>(0)
   const [netAmount, setNetAmount] = useState<number>(0)
   const [itemId, setItemId] = useState<string>('')
   const [date, setDate] = useState<Date | null>(null)
   const [supplyType, setSupplyType] = useState<string>(supplyTypes[0])
   const [isEditing, setIsEditing] = useState<boolean>(false)
   const [editId, setEditId] = useState<number>(-1)
   const [openDiscardModal, setOpenDiscardModal] = useState<boolean>(false)
   const { supplyId } = useParams()
   const codeRef = useRef<HTMLInputElement>(null)
   const qtyRef = useRef<HTMLInputElement>(null)
   const priceRef = useRef<HTMLInputElement>(null)
   const percentRef = useRef<HTMLInputElement>(null)
   const navigate = useNavigate()

   useHotkeys(
      'alt+r',
      () => {
         if (rows.length > 0) setOpenDiscardModal(true)
      },
      [rows]
   )

   const {
      message: successMessage,
      openMessageModal: openSuccessMessageModal,
      handleOpenMessageModal: handleOpenSuccessMessageModal,
      handleCloseMessageModal: handleCloseSuccessMessageModal,
      handleSetMessage: handleSetSuccessMessage,
   } = useMessageModal()

   const {
      message: errorMessage,
      openMessageModal: openErrorMessageModal,
      handleOpenMessageModal: handleOpenErrorMessageModal,
      handleSetMessage: handleSetErrorMessage,
      handleCloseMessageModal: handleCloseErrorMessageModal,
   } = useMessageModal()

   const {
      value: supplierCode,
      valueIsValid: supplierCodeIsValid,
      setValue: setSupplierCode,
      inputChangeHandler: supplierCodeChangeHandler,
      inputBlurHandler: supplierCodeBlurHandler,
      inputError: supplierCodeError,
      submitInputHandler: submitSupplierCodeInput,
   } = useInput(isNotEmpty)

   const {
      value: supplierName,
      valueIsValid: supplierNameIsValid,
      setValue: setSupplierName,
      inputChangeHandler: supplierNameChangeHandler,
      inputBlurHandler: supplierNameBlurHandler,
      inputError: supplierNameError,
      submitInputHandler: submitSupplierNameInput,
   } = useInput(isNotEmpty)

   const { value: supplyNum, setValue: setSupplyNum } = useDisableInput(isGreaterThanZero)

   const {
      value: itemCode,
      valueIsValid: itemCodeIsValid,
      setValue: setItemCode,
      inputChangeHandler: itemCodeChangeHandler,
      inputBlurHandler: itemCodeBlurHandler,
      inputError: itemCodeError,
      reset: resetItemCode,
      submitInputHandler: submitItemCodeInput,
   } = useInput(isNotEmpty)

   const {
      value: itemName,
      valueIsValid: itemNameIsValid,
      setValue: setItemName,
      inputError: itemNameError,
      reset: resetItemName,
   } = useDisableInput(isNotEmpty)

   const {
      value: qty,
      valueIsValid: qtyIsValid,
      setValue: setQty,
      inputChangeHandler: qtyChangeHandler,
      inputBlurHandler: qtyBlurHandler,
      inputError: qtyError,
      reset: resetQty,
      submitInputHandler: submitQtyInput,
   } = useInput(isValidQty)

   const {
      value: unitPrice,
      valueIsValid: unitPriceIsValid,
      setValue: setUnitPrice,
      inputChangeHandler: unitPriceChangeHandler,
      inputBlurHandler: unitPriceBlurHandler,
      inputError: unitPriceError,
      reset: resetUnitPrice,
      submitInputHandler: submitUnitPriceInput,
   } = useInput(isGreaterThanZero)

   const {
      value: unitPercent,
      valueIsValid: unitPercentIsValid,
      setValue: setUnitPercent,
      inputChangeHandler: unitPercentChangeHandler,
      inputBlurHandler: unitPercentBlurHandler,
      inputError: unitPercentError,
      reset: resetUnitPercent,
      submitInputHandler: submitUnitPercentInput,
   } = useInput(isPercentage)

   const { data: suppliersData, isFetching: fetchingSuppliers } = useGetSuppliers()

   const { data: supplyData, isFetching: fetchingSupply } = useGetSupplyById(supplyId!)

   const { data: itemsData, isFetching: fetchingItems } = useGetItems()

   const {
      data: updateSupplyData,
      mutateAsync: updateSupply,
      isLoading: isCreatingSupply,
      reset: resetUpdateSupply,
      isSuccess: isUpdatedSupply,
      isError: isFailToUpdate,
      error: updateSupplyError,
   } = useUpdateSupply()

   const suppliers = suppliersData?.data
   const items = itemsData?.data

   const refsBlur = () => {
      codeRef?.current?.blur()
      qtyRef?.current?.blur()
      priceRef?.current?.blur()
      percentRef?.current?.blur()
   }

   const resetItemInputs = useCallback(() => {
      setEditId(-1)
      setItemId('')
      resetItemCode()
      resetItemName()
      resetQty()
      resetUnitPrice()
      resetUnitPercent()
      setNetAmount(0)
   }, [])

   const submitItemInputs = () => {
      submitItemCodeInput()
      submitQtyInput()
      submitUnitPercentInput()
      submitUnitPriceInput()
   }

   const loading = fetchingSuppliers || fetchingItems || isCreatingSupply || fetchingSupply

   const isValidToUpdate = supplierNameIsValid && rows.length > 0
   useHotkeys('alt+s', () => handleUpdateSupply(), [isValidToUpdate, rows, supplierName, supplyType])

   const formIsValid =
      itemCodeIsValid && itemNameIsValid && qtyIsValid && unitPriceIsValid && unitPercentIsValid

   const checkItemValues = (value: string) => {
      const item = items?.find((item) => item.itemCode === value)
      if (item) {
         setItemName(item.itemName)
         setUnitPrice(item.unitPrice.toString())
         setUnitPercent((item.unitPercent * 100).toString())
         setItemId(item.itemId)
         return
      }
      setItemName('')
      setUnitPrice('')
      setUnitPercent('')
      setItemId('')
      return
   }

   const handleDiscard = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setRows([])
      setOpenDiscardModal(false)
      resetItemInputs()
   }

   const handleItemCodeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      itemCodeChangeHandler(e)
      checkItemValues(e.target.value)
   }

   const handleEdit = useCallback(
      (data: any) => {
         const {
            row: {
               id: editId,
               itemCode: editItemCode,
               itemName: editItemName,
               itemId: editItemId,
               netAmount: editNetAmount,
               qty: editQty,
               unitPercent: editUnitPercent,
               unitPrice: editUnitPrice,
            },
         } = data
         setItemCode(editItemCode)
         setEditId(editId)
         setItemName(editItemName)
         setItemId(editItemId)
         setNetAmount(editNetAmount)
         setQty(editQty)
         setUnitPrice(editUnitPrice)
         setUnitPercent((editUnitPercent * 100).toString())
      },
      [setItemCode, setItemName, setQty, setUnitPercent, setUnitPrice]
   )

   const handleDateChange = (value: Date | null) => {}

   const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      setRows((prev) => [
         ...prev,
         {
            id: prev.length + 1,
            itemId,
            itemCode,
            itemName,
            qty,
            unitPrice,
            unitPercent: +unitPercent / 100,
            netAmount,
         },
      ])
      refsBlur()
      resetItemInputs()
   }

   const handleUpdateItem = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!formIsValid) {
         submitItemInputs()
         return
      }
      setRows((prev) =>
         prev.map((row) =>
            row.id === editId
               ? {
                    id: editId,
                    itemId,
                    itemCode,
                    itemName,
                    qty,
                    unitPrice,
                    unitPercent: +unitPercent / 100,
                    netAmount,
                 }
               : row
         )
      )
      refsBlur()
      resetItemInputs()
      setIsEditing(false)
   }

   const handleUpdateSupply = () => {
      if (!isValidToUpdate) {
         submitSupplierCodeInput()
         submitSupplierNameInput()

         return
      }
      const items = rows.map((row) => ({
         itemId: row.itemId,
         qty: +row.qty,
         unitPrice: +row.unitPrice,
         unitPercent: +row.unitPercent,
      }))
      updateSupply({ supplyId: supplyId as string, supplierName, supplyType, items }).then(() => {
         setRows([])
         resetItemInputs()
         navigate('/supplies', { replace: true })
      })
   }

   useEffect(() => {
      const supplier = suppliers?.find((supplier) => supplier.supplierCode === supplierCode)
      if (supplier) {
         setSupplierName(supplier.supplierName)
         return
      }
   }, [suppliers, supplierCode, setSupplierName])

   useEffect(() => {
      if (qty && unitPrice) {
         setNetAmount(calcNetAmount(+qty, +unitPrice, +unitPercent / 100))
      }
   }, [qty, unitPrice, unitPercent, setNetAmount])

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
         console.log(supplierName + 'supplierName')
         if (supplier) {
            setSupplierCode(supplier.supplierCode)
         }
      }
   }, [suppliers, items, supplyData, setSupplierCode, setSupplierName, setSupplyNum])

   useEffect(() => {
      if (isUpdatedSupply) {
         handleSetSuccessMessage(updateSupplyData.message)
         handleOpenSuccessMessageModal()
         resetUpdateSupply()
         return
      }

      if (isFailToUpdate) {
         handleSetErrorMessage((updateSupplyError as Error).message)
         handleOpenErrorMessageModal()
         resetUpdateSupply()
         return
      }
   }, [
      updateSupplyData?.message,
      updateSupplyError,
      handleOpenErrorMessageModal,
      handleOpenSuccessMessageModal,
      handleSetErrorMessage,
      handleSetSuccessMessage,
      isUpdatedSupply,
      isFailToUpdate,
      resetUpdateSupply,
   ])

   console.log(supplyId)

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

         <ItemsWrapper onSubmit={isEditing ? handleUpdateItem : handleAddItem}>
            <Row>
               <GridItemOne>
                  <Flex display="flex">
                     <TextFieldWrapper sx={{ flex: 1 }}>
                        <TextField
                           variant="outlined"
                           label="Code"
                           size="small"
                           value={itemCode}
                           onChange={handleItemCodeChangeHandler}
                           onBlur={itemCodeBlurHandler}
                           error={itemCodeError}
                           helperText={itemCodeError && 'This field is required'}
                           inputRef={codeRef}
                           fullWidth
                        />
                     </TextFieldWrapper>
                     <TextFieldWrapper sx={{ flex: 2 }}>
                        <TextField
                           variant="outlined"
                           label="Name"
                           size="small"
                           value={itemName}
                           error={itemNameError && itemCodeError}
                           helperText={itemNameError && itemCodeError && 'This field is required'}
                           fullWidth
                           disabled
                        />
                     </TextFieldWrapper>
                  </Flex>
               </GridItemOne>

               <GridItemTwo>
                  <Flex>
                     <TextFieldWrapper sx={{ flex: 1 }}>
                        <TextField
                           variant="outlined"
                           label="Quantity"
                           size="small"
                           inputRef={qtyRef}
                           value={qty}
                           type="number"
                           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                           onChange={qtyChangeHandler}
                           onBlur={qtyBlurHandler}
                           error={qtyError}
                           helperText={qtyError && 'This field is required'}
                           fullWidth
                        />
                     </TextFieldWrapper>

                     <TextFieldWrapper sx={{ flex: 1 }}>
                        <TextField
                           variant="outlined"
                           label="Price"
                           size="small"
                           type="number"
                           inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                           value={unitPrice}
                           inputRef={priceRef}
                           onChange={unitPriceChangeHandler}
                           onBlur={unitPriceBlurHandler}
                           error={unitPriceError}
                           helperText={unitPriceError && 'Please Fill a valid price'}
                           fullWidth
                        />
                     </TextFieldWrapper>

                     <TextFieldWrapper sx={{ flex: 1 }}>
                        <TextField
                           variant="outlined"
                           label="Percent"
                           size="small"
                           type="number"
                           inputProps={{
                              inputMode: 'decimal',
                              pattern: '[0-9]+([.,][0-9])*',
                              step: 'any',
                              min: '0',
                              max: '100',
                           }}
                           value={unitPercent}
                           inputRef={percentRef}
                           onChange={unitPercentChangeHandler}
                           onBlur={unitPercentBlurHandler}
                           error={unitPercentError}
                           helperText={unitPercentError && 'Must be between 0 and 100'}
                           fullWidth
                        />
                     </TextFieldWrapper>
                     <ActionsWrapper>
                        <StyledButton
                           variant="contained"
                           size="small"
                           color="primary"
                           fullWidth
                           type="submit"
                        >
                           {isEditing ? 'Update' : 'Add'}
                        </StyledButton>
                     </ActionsWrapper>
                  </Flex>
               </GridItemTwo>
            </Row>
         </ItemsWrapper>
         <TableWrapper>
            <SupplyItemsTable
               onUpdate={handleEdit}
               rows={rows}
               setRows={setRows}
               total={total}
               loading={loading}
               setIsEditing={setIsEditing}
               editId={editId}
               resetItemInputs={resetItemInputs}
               isEditing={isEditing}
            />
         </TableWrapper>

         <Box sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <SubmitActionsWrapper>
               <TextFieldWrapper>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="success"
                     onClick={handleUpdateSupply}
                     fullWidth
                  >
                     Save
                  </StyledButton>
               </TextFieldWrapper>

               <TextFieldWrapper sx={{ pr: 0 }}>
                  <StyledButton
                     variant="outlined"
                     size="small"
                     color="error"
                     onClick={() => setOpenDiscardModal(true)}
                     fullWidth
                     disabled={rows.length === 0}
                  >
                     Discard
                  </StyledButton>
               </TextFieldWrapper>
            </SubmitActionsWrapper>
         </Box>
         <WarningModal
            open={openDiscardModal}
            onClose={() => setOpenDiscardModal(false)}
            onSubmit={handleDiscard}
            action="discard"
            proceedTitle="Discard"
         />

         <MessageModal
            variant="success"
            onClose={handleCloseSuccessMessageModal}
            message={successMessage}
            open={openSuccessMessageModal}
         />

         <MessageModal
            variant="error"
            onClose={handleCloseErrorMessageModal}
            message={errorMessage}
            open={openErrorMessageModal}
         />
      </Container>
   )
}
