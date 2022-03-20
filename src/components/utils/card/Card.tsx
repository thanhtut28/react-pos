import {
   StyledCard,
   CardHeader,
   StyledCardContent,
   CardHeaderText,
   CardSubHeaderText,
   CardBody,
   CardAmountText,
   CardSubDetailsFooterText,
   CardBodyDetails,
   CardSubDetailsHeaderText,
} from './Elements'

interface Props {
   header: string
   subheader?: string
   detailsHeader: number
   detailsFooter: string
   amount: number
}

export default function Card({ header, subheader, detailsFooter, detailsHeader, amount }: Props) {
   return (
      <StyledCard>
         <StyledCardContent>
            <CardHeader>
               <CardHeaderText>{header}</CardHeaderText>
               {subheader && <CardSubHeaderText>{subheader}</CardSubHeaderText>}
            </CardHeader>

            <CardBody>
               <CardBodyDetails>
                  <CardSubDetailsHeaderText>
                     {detailsHeader >= 100000 ? `${detailsHeader / 100000} Lakhs` : `${detailsHeader} Ks`}
                  </CardSubDetailsHeaderText>
                  <CardSubDetailsFooterText>{detailsFooter}</CardSubDetailsFooterText>
               </CardBodyDetails>
               <CardAmountText>{amount}</CardAmountText>
            </CardBody>
         </StyledCardContent>
      </StyledCard>
   )
}
