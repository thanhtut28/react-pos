import { SidebarDrawerContainer } from './Elements'
import { useLayoutContext } from '../../contexts/LayoutContext'
import SidebarMenuList from './SidebarMenuList'

export default function SidebarDrawer({ openSidebar }: { openSidebar: boolean }) {
   const { handleToggleSidebar } = useLayoutContext()
   return (
      <SidebarDrawerContainer open={openSidebar} onClose={handleToggleSidebar}>
         <SidebarMenuList />
      </SidebarDrawerContainer>
   )
}
