import { TypeItem } from '@root/src/dummy/items'
import { StyledCard } from './Elements'

interface Props {
   item: TypeItem
}

export default function Card({ item }: Props) {
   return <StyledCard>{item.title}</StyledCard>
}
