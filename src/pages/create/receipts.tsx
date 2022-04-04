import useInput from '../../hooks/useInput'
import { isNotEmpty } from '../../helpers/isNotEmpty'

export default function createReceipts() {
   const { value: customerCode, valueIsValid: customerCodeIsValid } = useInput(isNotEmpty)

   return <></>
}
