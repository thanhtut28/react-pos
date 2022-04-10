import { Box, Button, Grid, GridProps } from '@mui/material'
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
}))

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
   padding: theme.spacing(1),
   width: '100%',
}))

export const ItemsWrapper = styled('form')(({ theme }) => ({
   width: '100%',
   maxWidth: 1200,
   paddingTop: theme.spacing(3),
   // paddingBottom: theme.spacing(3),
}))

export const Row = styled((props: GridProps) => <Grid {...props} container />)(({ theme }) => ({}))

export const GridItemOne = styled((props: GridProps) => <Grid {...props} item xs={12} md={4} />)(() => ({}))

export const GridItemTwo = styled((props: GridProps) => <Grid {...props} item xs={12} md={8} />)(() => ({}))

export const Flex = styled(Box)(() => ({ display: 'flex', alignItems: 'stretch' }))

export const TableWrapper = styled(Box)(({ theme }) => ({
   padding: theme.spacing(1),
}))

export const StyledButton = styled(Button)(({ theme }) => ({
   height: 40,
}))

export const ActionsWrapper = styled(Box)(({ theme }) => ({
   width: '100%',
   flex: 1,
   padding: theme.spacing(1),
   display: 'flex',
   justifyContent: 'flex-end',
}))

export const SubmitActionsWrapper = styled(Box)(({ theme }) => ({
   width: '100%',
   maxWidth: 500,
   padding: theme.spacing(1),
   display: 'flex',
   justifyContent: 'flex-end',
}))
