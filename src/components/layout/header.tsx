import { ButtonBase, Typography } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'
import MenuIcon from '@mui/icons-material/Menu'
import { StyledAppBar, StyledAvatar, StyledToolbar, ToggleBarWrapper } from './Elements'

export default function header() {
   const { handleToggleSidebar } = useLayoutContext()
   return (
      <StyledAppBar>
         <StyledToolbar>
            <ToggleBarWrapper sx={{ pl: 2 }}>
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
         </StyledToolbar>
      </StyledAppBar>
   )
}
