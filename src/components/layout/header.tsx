import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, ButtonBase, Typography } from '@mui/material'
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
               <ToggleBarWrapper>
                  <ButtonBase aria-label="menu-toggler" onClick={handleToggleSidebar}>
                     <Typography variant="h6" color="textPrimary">
                        UMT Store
                     </Typography>
                  </ButtonBase>

                  <ButtonBase aria-label="menu-toggler" onClick={handleToggleSidebar}>
                     <StyledAvatar>
                        <MenuIcon />
                     </StyledAvatar>
                  </ButtonBase>
               </ToggleBarWrapper>
               <Button
                  variant="contained"
                  color="error"
                  disableElevation
                  onClick={() => setOpenLogoutModal(true)}
               >
                  Log Out
               </Button>
               <LogoutModal
                  onSubmit={handleLogout}
                  open={openLogoutModal}
                  onClose={() => setOpenLogoutModal(true)}
                  action="logout"
                  proceedTitle="Logout"
               />
            </ToolbarWrapper>
         </StyledToolbar>
      </StyledAppBar>
   )
}
