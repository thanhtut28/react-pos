import Card from '../../../components/utils/card'
import { CardsWrapper, CardWrapper, Container, Heading } from './Elements'
// import { CustomerInterface } from '../../../dummy'

export default function CustomerCards({ customers }: { customers: any[] }) {
   const calcExpDate = (date: Date) => {
      const today = new Date().getTime()
      const exceedingDays = Math.abs(today - date.getTime())
      return Math.floor(exceedingDays / 1000 / 60 / 60 / 24)
   }

   return (
      <Container>
         <Heading>Credits</Heading>
         {/* <CardsWrapper>
            {customers.map((customer) => (
               <CardWrapper key={customer.code}>
                  <Card
                     header={customer.code}
                     detailsHeader={customer.credit}
                     detailsFooter={customer.name}
                     amount={calcExpDate(customer.expiryDate)}
                  />
               </CardWrapper>
            ))}
         </CardsWrapper> */}
      </Container>
   )
}
