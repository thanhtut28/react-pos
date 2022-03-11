import { SidebarContainer, SidebarMenu } from './Elements'
import { pages } from '../../dummy/pages'
import MenuItem from './MenuItem'

interface Props {
   open: boolean
}

export default function Sidebar({ open }: Props) {
   return (
      <SidebarContainer open={open}>
         <SidebarMenu>
            {pages.map((page) => (
               <MenuItem key={page.title} page={page} />
            ))}
         </SidebarMenu>
      </SidebarContainer>
   )
}
