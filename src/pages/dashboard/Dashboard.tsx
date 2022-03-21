import { items, customers } from '../../dummy'
import { ProductCards, CustomerCards } from './cards'
import { MainWrapper } from './Elements'

export default function Dashboard() {
   return (
      <MainWrapper>
         <ProductCards items={items} />
         <CustomerCards customers={customers} />
      </MainWrapper>
   )
}
