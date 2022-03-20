import { SidebarContainer, SidebarWrapper } from './Elements'
import SidebarList from './SidebarList'

interface Props {
   openSidebar?: boolean
}

export default function Sidebar({ openSidebar }: Props) {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         <SidebarWrapper>
            <SidebarList />
         </SidebarWrapper>
      </SidebarContainer>
   )
}
