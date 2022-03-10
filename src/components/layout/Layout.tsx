import { useState } from 'react'
import Sidebar from './Sidebar'
import { LayoutContainer, GridItem } from './Elements'
import { Box, AppBar, Button, Toolbar } from '@mui/material'

interface Props {
   children: React.ReactNode
}

export default function Layout({ children }: Props) {
   const [open, setOpen] = useState<boolean>(true)

   return (
      <Box>
         <AppBar elevation={0}>
            <Toolbar sx={{ bgcolor: '#fff' }}>
               <Button variant="contained" color="success" onClick={() => setOpen((prev) => !prev)}>
                  Toggle
               </Button>
            </Toolbar>
         </AppBar>
         <LayoutContainer marginTop={10}>
            {open && (
               <GridItem xs={2} sx={{ flexShrink: 0 }}>
                  <Sidebar />
               </GridItem>
            )}
            <GridItem xs={open ? 10 : 12} sx={{ height: '100vh', px: 5 }}>
               {children}
            </GridItem>
         </LayoutContainer>
      </Box>
   )
}
