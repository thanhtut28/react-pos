import { Autocomplete, Box, Button, DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3),
   backgroundColor: theme.palette.common.white,
}))

export const ToolbarWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-end',
   paddingTop: theme.spacing(4),
   paddingBottom: theme.spacing(4),
}))

export const StyledDialogTitle = styled(DialogTitle)(() => ({
   textAlign: 'center',
}))

export const StyledButton = styled(Button)(() => ({
   width: 80,
}))

export const DialogBody = styled('form')(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   padding: theme.spacing(5),
   alignItems: 'center',
}))

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
   paddingTop: theme.spacing(2),
   paddingBottom: theme.spacing(2),
   width: '100%',
}))

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
   height: 40,
}))

export const ActionsWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '100%',
   justifyContent: 'flex-end',
   padding: theme.spacing(3),
   paddingRight: 0,
}))
