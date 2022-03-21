import Card from '../../../components/utils/card'
import { CardsWrapper, CardWrapper, Container, Heading } from './Elements'
import { ItemInterface } from '../../../dummy'
import SeeAllCard from '../../../components/utils/card/SeeAllCard'

export default function ProductCard({ items }: { items: ItemInterface[] }) {
   return (
      <Container>
         <Heading>Low Stocks</Heading>
         <CardsWrapper>
            {items.map((item) => (
               <CardWrapper key={item.code}>
                  <Card
                     header={item.code}
                     subheader={item.size}
                     detailsHeader={item.price}
                     detailsFooter={item.title}
                     amount={item.amount}
                  />
               </CardWrapper>
            ))}
            <CardWrapper>
               <SeeAllCard />
            </CardWrapper>
         </CardsWrapper>
      </Container>
   )
}
