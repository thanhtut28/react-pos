import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
interface Props {
   value: Date | null
   onChange: (value: Date | null) => void
   disabled?: boolean
   maxDate?: Date
}

export default function DatePickerComponent({
   value,
   onChange,
   disabled = false,
   maxDate = new Date(),
}: Props) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DatePicker
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
            disabled={disabled}
            maxDate={maxDate}
            label="Date"
            allowSameDateSelection
         />
      </LocalizationProvider>
   )
}
