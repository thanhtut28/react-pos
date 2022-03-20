import { SidebarListItem } from './Elements'
import { ListItemIcon, ListItemText } from '@mui/material'
import { PageInterface } from '../../../dummy'

interface Props {
   page: PageInterface
}

const MenuItem: React.FC<Props> = ({ page }: Props) => (
   <SidebarListItem active={page.active} onClick={() => console.log(page)}>
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText>{page.title}</ListItemText>
   </SidebarListItem>
)

export default MenuItem
