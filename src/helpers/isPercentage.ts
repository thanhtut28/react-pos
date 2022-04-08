import { isNotEmpty } from './isNotEmpty'

export const isPercentage = (value: string) => {
   if (!isNotEmpty(value)) return false
   return +value >= 0 && +value <= 100
}
