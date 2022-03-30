import { Avatar, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Box } from '@mui/system'

export const Wrapper = styled(Box)(({ theme }) => ({
   marginTop: theme.spacing(8),
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
}))

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
   margin: theme.spacing(1),
   backgroundColor: theme.palette.secondary.main,
}))

export const Form = styled('form')(({ theme }) => ({
   marginTop: theme.spacing(1),
}))

export const LoginButton = styled(Button)(({ theme }) => ({
   marginTop: theme.spacing(2),
   marginBottom: theme.spacing(2),
}))
