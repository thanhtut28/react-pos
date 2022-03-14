import { items, customers } from '../../dummy'
import { ProductCards, CustomerCards } from './cards'

export default function Dashboard() {
   return (
      <>
         <ProductCards items={items} />
         <CustomerCards customers={customers} />
      </>
   )
}
