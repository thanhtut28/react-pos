import { SidebarContainer, SidebarWrapper } from './Elements'
import SidebarList from './SidebarList'
import { Scrollbars } from 'react-custom-scrollbars'
interface Props {
   openSidebar?: boolean
}

const Sidebar: React.FC<Props> = ({ openSidebar }) => {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         <SidebarWrapper>
            <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
               <SidebarList />
            </Scrollbars>
         </SidebarWrapper>
      </SidebarContainer>
   )
}

export default Sidebar
