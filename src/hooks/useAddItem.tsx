import { useState } from 'react'

interface Props {
   [prop: string]: string | number
}

export default function useAddItem(initialValues: Props) {
   const [values, setValues] = useState(initialValues)

   return [
      values,
      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
         setValues({
            ...values,
            [e.target.name]: e.target.value,
         })
      },
   ]
}
