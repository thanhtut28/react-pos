import { useState } from 'react'

export default function useDisableInput(validate: (value: string, items?: any) => boolean) {
   const [value, setValue] = useState<string>('')

   const valueIsValid = validate(value)
   const inputError = !valueIsValid

   const reset = () => {
      setValue('')
   }

   return {
      value,
      setValue,
      valueIsValid,
      inputError,
      reset,
   }
}
