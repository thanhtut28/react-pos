import * as React from 'react'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
interface Props {
   value: string | null
   onChange: (value: string | null) => void
}

export default function DatePickerComponent({ value, onChange }: Props) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DatePicker
            value={value}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
            disabled
         />
      </LocalizationProvider>
   )
}
