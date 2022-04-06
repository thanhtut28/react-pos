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
   display: 'flex',
   flexDirection: 'column',
   paddingBottom: theme.spacing(3),
}))

export const StyledRow = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   // [theme.breakpoints.down('sm')]: {
   //    flexDirection: 'column',
   //    //   justifyContent: 'flex-start',
   // },
   alignItems: 'center',
}))

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
   padding: theme.spacing(1),
}))

export const ItemsWrapper = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: 500,
   margin: '0 auto',
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   paddingTop: theme.spacing(3),
}))

export const Row = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '100%',
}))

export const StyledButton = styled(Button)(({ theme }) => ({
   width: '100%',
}))

export const ActionsWrapper = styled(Box)(({ theme }) => ({
   width: '100%',
   flex: 1,
   padding: theme.spacing(1),
   display: 'flex',
   justifyContent: 'flex-end',
}))
