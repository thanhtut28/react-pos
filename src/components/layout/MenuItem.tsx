import { SidebarMenuItem } from './Elements'
import { ListItemIcon, ListItemText } from '@mui/material'
import { Page } from '../../dummy/pages'

interface Props {
   page: Page
}

const MenuItem: React.FC<Props> = ({ page }: Props) => (
   <SidebarMenuItem active={page.active} onClick={() => console.log(page)}>
      <ListItemIcon>{page.icon}</ListItemIcon>
      <ListItemText>{page.title}</ListItemText>
   </SidebarMenuItem>
)

export default MenuItem
