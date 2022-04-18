import { useNavigate } from 'react-router-dom'
import { Sidebar, SidebarDrawer } from './sidebar'
import { LayoutContainer, MainContainer, Offset } from './Elements'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'
import { Outlet } from 'react-router-dom'
import Header from './header'
import WarningModal from '../../components/warningModal'

export default function Layout() {
   const { openSidebar, openWarningModal, destinationRoute, handleCloseWarningModal } = useLayoutContext()
   const navigate = useNavigate()
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down('md'))

   const handleNavigate = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      navigate(destinationRoute as string, { replace: true })
      handleCloseWarningModal()
   }

   return (
      <Box>
         <Header />
         <Offset />
         <LayoutContainer>
            {!isMobile && <Sidebar openSidebar={openSidebar} />}
            {isMobile && <SidebarDrawer openSidebar={openSidebar} />}

            <MainContainer openSidebar={openSidebar}>
               <Outlet />
            </MainContainer>

            <WarningModal
               onSubmit={handleNavigate}
               open={openWarningModal}
               onClose={handleCloseWarningModal}
               action="leave this page, all the changes will be lost"
               proceedTitle="Leave"
            />
         </LayoutContainer>
      </Box>
   )
}
