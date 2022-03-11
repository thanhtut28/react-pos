import { TypeItem } from '@root/src/dummy/items'
import {
   StyledCard,
   CardHeader,
   StyledCardContent,
   CardPriceText,
   CardTitleText,
   CardBody,
   CardAmountText,
   CardCodeText,
   CardBodyDetails,
   CardSizeText,
} from './Elements'

interface Props {
   item: TypeItem
}

export default function Card({ item }: Props) {
   return (
      <StyledCard>
         <StyledCardContent>
            <CardHeader>
               <CardCodeText>{item.code}</CardCodeText>
               <CardSizeText>{item.size}</CardSizeText>
            </CardHeader>

            <CardBody>
               <CardBodyDetails>
                  <CardPriceText>{item.price}Ks</CardPriceText>
                  <CardTitleText>{item.title}</CardTitleText>
               </CardBodyDetails>
               <CardAmountText>{item.amount}</CardAmountText>
            </CardBody>
         </StyledCardContent>
      </StyledCard>
   )
}
