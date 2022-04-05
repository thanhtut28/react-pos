import { useEffect, useState } from 'react'
import { TextField, FormControl, MenuItem, InputLabel, Divider } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'
import useGetCustomers from '../../api/queries/useGetCustomers'
import {
   Container,
   InputsWrapper,
   ItemsWrapper,
   StyledRow,
   TextFieldWrapper,
   StyledButton,
   ActionsWrapper,
} from '../../components/create/Elements'
import DatePicker from '../../components/datePicker'
import { receiptTypes } from '../../dummy'

export default function CreateReceipts() {
   const {
      value: customerCode,
      valueIsValid: customerCodeIsValid,
      inputChangeHandler: customerCodeChangeHandler,
   } = useInput(isNotEmpty)
   const [customerName, setCustomerName] = useState<string>('')
   const today = new Date()
   const [type, setType] = useState<string>(receiptTypes[0])
   const { data: customersData } = useGetCustomers()
   const customers = customersData?.data

   const handleDateChange = (value: string | null) => {}

   useEffect(() => {
      const customer = customers?.find((customer) => customer.code === customerCode)
      if (customer) {
         setCustomerName(customer.name)
         return
      }
      setCustomerName('')
      return
   }, [customers, customerCode])

   return (
      <Container>
         <InputsWrapper>
            <StyledRow>
               <TextFieldWrapper>
                  <TextField
                     variant="outlined"
                     label="customer code"
                     size="small"
                     required
                     value={customerCode}
                     onChange={customerCodeChangeHandler}
                  />
               </TextFieldWrapper>
            </StyledRow>
            <StyledRow>
               <TextFieldWrapper>
                  <TextField
                     variant="outlined"
                     label="customer name"
                     size="small"
                     required
                     value={customerName}
                     disabled
                  />
               </TextFieldWrapper>

               <TextFieldWrapper>
                  <DatePicker value={today.toString()} onChange={handleDateChange} />
               </TextFieldWrapper>
            </StyledRow>
            <StyledRow>
               <TextFieldWrapper>
                  <FormControl fullWidth>
                     <InputLabel id="demo-simple-select-label">Age</InputLabel>
                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Age"
                        onChange={(e) => setType(e.target.value as string)}
                     >
                        {receiptTypes.map((type) => (
                           <MenuItem key={type} value={type}>
                              {type}
                           </MenuItem>
                        ))}
                        <MenuItem key="none" value="">
                           <em>None</em>
                        </MenuItem>
                     </Select>
                  </FormControl>
               </TextFieldWrapper>
            </StyledRow>
         </InputsWrapper>
         <Divider />
         <ItemsWrapper>
            <TextFieldWrapper>
               <TextField
                  variant="outlined"
                  label="customer code"
                  size="small"
                  required
                  value={customerCode}
                  onChange={customerCodeChangeHandler}
               />
            </TextFieldWrapper>
            <TextFieldWrapper>
               <TextField
                  variant="outlined"
                  label="customer code"
                  size="small"
                  required
                  value={customerCode}
                  onChange={customerCodeChangeHandler}
               />
            </TextFieldWrapper>
            <TextFieldWrapper>
               <TextField
                  variant="outlined"
                  label="customer code"
                  size="small"
                  required
                  value={customerCode}
                  onChange={customerCodeChangeHandler}
               />
            </TextFieldWrapper>
            <TextFieldWrapper>
               <TextField
                  variant="outlined"
                  label="customer code"
                  size="small"
                  required
                  value={customerCode}
                  onChange={customerCodeChangeHandler}
               />
            </TextFieldWrapper>
            <TextFieldWrapper>
               <TextField
                  variant="outlined"
                  label="customer code"
                  size="small"
                  required
                  value={customerCode}
                  onChange={customerCodeChangeHandler}
               />
            </TextFieldWrapper>
            <ActionsWrapper>
               <StyledButton variant="contained" size="small" color="primary">
                  Add
               </StyledButton>
            </ActionsWrapper>
         </ItemsWrapper>
      </Container>
   )
}
