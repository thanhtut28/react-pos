import { SidebarContainer, SidebarWrapper } from './Elements'
import SidebarList from './SidebarList'
// import SimpleBar from 'simplebar-react'
// import 'simplebar/dist/simplebar.min.css'
interface Props {
   openSidebar?: boolean
}

const Sidebar: React.FC<Props> = ({ openSidebar }) => {
   return (
      <SidebarContainer openSidebar={openSidebar}>
         {/* <SimpleBar> */}
         <SidebarWrapper>
            <SidebarList />
         </SidebarWrapper>
         {/* </SimpleBar> */}
      </SidebarContainer>
   )
}

export default Sidebar
