import { useNavigate } from 'react-router-dom'
import { Button, ButtonBase, Typography } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'
import MenuIcon from '@mui/icons-material/Menu'
import { StyledAppBar, StyledAvatar, StyledToolbar, ToggleBarWrapper, ToolbarWrapper } from './Elements'
import { useAuth } from '../../contexts/AuthContext'

export default function header() {
   const { handleToggleSidebar } = useLayoutContext()
   const { signOut } = useAuth()
   const navigate = useNavigate()

   const handleLogout = () => {
      signOut(() => {
         navigate('/login')
         localStorage.removeItem('user')
      })
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
               <Button variant="contained" color="error" disableElevation onClick={handleLogout}>
                  Log Out
               </Button>
            </ToolbarWrapper>
         </StyledToolbar>
      </StyledAppBar>
   )
}
