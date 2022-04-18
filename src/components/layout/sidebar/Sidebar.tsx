import { SidebarContainer, SidebarWrapper } from './Elements'
import SidebarList from './SidebarList'
interface Props {
   openSidebar?: boolean
}

const Sidebar: React.FC<Props> = ({ openSidebar }) => {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         <SidebarWrapper>
            <SidebarList />
         </SidebarWrapper>
      </SidebarContainer>
   )
}

export default Sidebar
