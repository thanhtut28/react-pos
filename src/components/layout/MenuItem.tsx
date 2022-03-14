import { SidebarMenuItem } from './Elements'
import { ListItemIcon, ListItemText } from '@mui/material'
import { PageInterface } from '../../dummy'

interface Props {
   page: PageInterface
}

const MenuItem: React.FC<Props> = ({ page }: Props) => (
   <SidebarMenuItem active={page.active} onClick={() => console.log(page)}>
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText>{page.title}</ListItemText>
   </SidebarMenuItem>
)

export default MenuItem
