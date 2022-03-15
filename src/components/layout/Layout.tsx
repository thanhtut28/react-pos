import Sidebar from './Sidebar'
import SidebarDrawer from './SidebarDrawer'
import { LayoutContainer, MainContainer } from './Elements'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'
import Header from './header'

interface Props {
   children: React.ReactNode
}

export default function Layout({ children }: Props) {
   const { openSidebar } = useLayoutContext()
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down('md'))

   return (
      <Box>
         <Header />
         <LayoutContainer marginTop={10}>
            {!isMobile && <Sidebar openSidebar={openSidebar} />}
            {isMobile && <SidebarDrawer openSidebar={openSidebar} />}
            <MainContainer openSidebar={openSidebar}>{children}</MainContainer>
         </LayoutContainer>
      </Box>
   )
}
