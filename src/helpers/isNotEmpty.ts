export const isNotEmpty = (value: string): boolean => value.trim() !== ''

export const codeValidation = (isNotCreated: (v: string) => boolean, value: string): boolean => {
   const isValid = isNotEmpty(value) && isNotCreated(value)
   return isValid
}
