import { SidebarDrawerContainer } from './Elements'
import { useLayoutContext } from '../../../contexts/LayoutContext'
import SidebarList from './SidebarList'

export default function SidebarDrawer({ openSidebar }: { openSidebar: boolean }) {
   const { handleToggleSidebar } = useLayoutContext()
   return (
      <SidebarDrawerContainer open={openSidebar} onClose={handleToggleSidebar}>
         <SidebarList />
      </SidebarDrawerContainer>
   )
}
