import React from 'react'
import { Box, Typography } from '@mui/material'
import { alpha, styled } from '@mui/material/styles'

const StyledMainContainer = styled(Box)(({ theme }) => ({
   backgroundColor: alpha(theme.palette.primary.main, 0.35),
   width: '100%',
   height: '100%',
   borderRadius: 10,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}))

function App() {
   return (
      <StyledMainContainer>
         <Typography>Hello World</Typography>
      </StyledMainContainer>
   )
}

export default App
