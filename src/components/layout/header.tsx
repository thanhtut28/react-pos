import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, ButtonBase, Typography } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'
import MenuIcon from '@mui/icons-material/Menu'
import { StyledAppBar, StyledAvatar, StyledToolbar, ToggleBarWrapper, ToolbarWrapper } from './Elements'
import { useAuth } from '../../contexts/AuthContext'
import LogoutModal from '../warningModal'

export default function Header() {
   const { handleToggleSidebar } = useLayoutContext()
   const { signOut } = useAuth()
   const navigate = useNavigate()
   const [openLogoutModal, setOpenLogoutModal] = useState<boolean>(false)

   const handleLogout = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      signOut()
      navigate('/login', { replace: true })
   }

   return (
      <StyledAppBar>
         <StyledToolbar>
            <ToolbarWrapper>
               <Box width={92}>
                  <ButtonBase aria-label="menu-toggler" onClick={handleToggleSidebar}>
                     <StyledAvatar>
                        <MenuIcon />
                     </StyledAvatar>
                  </ButtonBase>
               </Box>

               <Box width={100} textAlign="center">
                  <ButtonBase aria-label="menu-toggler" onClick={() => navigate('/')}>
                     <Typography variant="h6" color="textPrimary">
                        UMT Store
                     </Typography>
                  </ButtonBase>
               </Box>

               <Box width={92}>
                  <Button
                     variant="contained"
                     color="error"
                     disableElevation
                     onClick={() => setOpenLogoutModal(true)}
                  >
                     Log Out
                  </Button>
               </Box>

               <LogoutModal
                  onSubmit={handleLogout}
                  open={openLogoutModal}
                  onClose={() => setOpenLogoutModal(false)}
                  action="logout"
                  proceedTitle="Logout"
               />
            </ToolbarWrapper>
         </StyledToolbar>
      </StyledAppBar>
   )
}
