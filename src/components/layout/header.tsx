import { AppBar, Toolbar, Button } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'

export default function header() {
   const { handleToggleSidebar } = useLayoutContext()
   return (
      <AppBar elevation={0}>
         <Toolbar sx={{ bgcolor: '#fff' }}>
            <Button variant="contained" color="success" onClick={handleToggleSidebar}>
               Toggle
            </Button>
         </Toolbar>
      </AppBar>
   )
}
