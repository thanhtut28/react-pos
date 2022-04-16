import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

interface Props {
   value: Date | null
   onChange: (value: Date | null) => void
}

export default function BasicDateTimePicker({ value, onChange }: Props) {
   return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
         <DateTimePicker
            renderInput={(props) => <TextField {...props} />}
            label="DateTimePicker"
            value={value}
            disabled
            onChange={onChange}
         />
      </LocalizationProvider>
   )
}
