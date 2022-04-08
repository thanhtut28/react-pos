import { isNotEmpty } from './isNotEmpty'

export const isValidQty = (value: string) => {
   if (!isNotEmpty(value)) return false
   return !value.includes('.')
}
