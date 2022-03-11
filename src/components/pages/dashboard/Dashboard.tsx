import { CardsWrapper, DashboardContainer, DashboardWrapper } from './Elements'
import { items } from '../../../dummy/items'
import Card from '../../utils/card'

export default function Dashboard() {
   return (
      <DashboardContainer>
         <DashboardWrapper>
            <CardsWrapper>
               {items.map((item) => (
                  <Card key={item.code} item={item} />
               ))}
            </CardsWrapper>
         </DashboardWrapper>
      </DashboardContainer>
   )
}
