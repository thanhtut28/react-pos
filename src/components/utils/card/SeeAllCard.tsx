import {
   StyledCard,
   CardHeader,
   StyledCardContent,
   CardBody,
   SeeAllText,
   CardBodyDetails,
   IconWrapper,
} from './Elements'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

export default function SeeAllCard() {
   return (
      <StyledCard>
         <StyledCardContent>
            <CardHeader>
               <SeeAllText>See All Products</SeeAllText>
            </CardHeader>

            <CardBody>
               <CardBodyDetails>
                  <IconWrapper>
                     <ChevronRightIcon />
                  </IconWrapper>
               </CardBodyDetails>
            </CardBody>
         </StyledCardContent>
      </StyledCard>
   )
}
