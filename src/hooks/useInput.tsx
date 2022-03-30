import React, { useState } from 'react'

export default function useInput() {
   const [value, setValue] = useState<string>('')
   const [isTouched, setIsTouched] = useState<boolean>(false)

   const valueIsValid = value.trim() !== ''
   const inputError = !valueIsValid && isTouched

   const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
   }

   const inputBlurHandler = () => {
      setIsTouched(true)
   }

   const reset = () => {
      setValue('')
      setIsTouched(false)
   }

   return {
      value,
      setValue,
      valueIsValid,
      inputError,
      inputChangeHandler,
      inputBlurHandler,
      reset,
   }
}
