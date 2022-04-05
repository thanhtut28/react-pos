import { Box, Button } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3),
   [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
   },
   backgroundColor: theme.palette.common.white,
}))

export const InputsWrapper = styled(Box)(({ theme }) => ({
   //    width: 1000,
   margin: `0 auto`,
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: theme.spacing(3),
}))

export const StyledRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      //   justifyContent: 'flex-start',
   },
   alignItems: 'center',
}))

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
   padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
   [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
   },
   width: 250,
}))

export const ItemsWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   //    justifyContent: 'center',
   paddingTop: theme.spacing(3),
   alignItems: 'center',
}))

export const StyledButton = styled(Button)(({ theme }) => ({
   width: 120,
}))

export const ActionsWrapper = styled(Box)(({ theme }) => ({
   padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
}))
