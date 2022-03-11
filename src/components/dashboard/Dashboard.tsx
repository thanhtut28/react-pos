import { CardsWrapper, CardWrapper, DashboardContainer, DashboardWrapper } from './Elements'
import { items } from '../../dummy/items'
import Card from '../utils/card'
import { useLayoutContext } from '../../contexts/LayoutContext'

export default function Dashboard() {
   const { openSidebar } = useLayoutContext()
   return (
      <DashboardContainer openSidebar={openSidebar}>
         <DashboardWrapper>
            <CardsWrapper>
               {items.map((item) => (
                  <CardWrapper key={item.code}>
                     <Card item={item} />
                  </CardWrapper>
               ))}
            </CardsWrapper>
         </DashboardWrapper>
      </DashboardContainer>
   )
}
