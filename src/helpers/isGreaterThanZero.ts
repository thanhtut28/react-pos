import { isNotEmpty } from './isNotEmpty'

export const isGreaterThanZero = (value: string) => {
   if (!isNotEmpty(value)) return false
   return +value >= 0
}
