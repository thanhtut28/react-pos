import Sidebar from './Sidebar'
import { LayoutContainer } from './Elements'
import { Box, AppBar, Button, Toolbar } from '@mui/material'
import { useLayoutContext } from '../../contexts/LayoutContext'

interface Props {
   children: React.ReactNode
}

export default function Layout({ children }: Props) {
   const { openSidebar, handleToggleSidebar } = useLayoutContext()

   console.log(openSidebar)
   return (
      <Box>
         <AppBar elevation={0}>
            <Toolbar sx={{ bgcolor: '#fff' }}>
               <Button variant="contained" color="success" onClick={handleToggleSidebar}>
                  Toggle
               </Button>
            </Toolbar>
         </AppBar>
         <LayoutContainer marginTop={10}>
            <Sidebar openSidebar={openSidebar} />
            {children}
         </LayoutContainer>
      </Box>
   )
}
