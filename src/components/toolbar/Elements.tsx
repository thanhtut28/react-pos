import {
   Autocomplete,
   Box,
   Button,
   DialogTitle,
   Avatar,
   AvatarProps,
   ButtonBase,
   Typography,
   TypographyProps,
} from '@mui/material'
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
   padding: `${theme.spacing(3)} ${theme.spacing(5)}`,
   alignItems: 'center',
}))

export const TextFieldWrapper = styled(Box)(({ theme }) => ({
   padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
   width: '100%',
}))

export const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
   height: 40,
}))

export const ActionsWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   width: '100%',
   justifyContent: 'flex-end',
   padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
}))

export const StyledAvatar = styled((props: AvatarProps) => <Avatar {...props} variant="rounded" />)(
   ({ theme }) => ({
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      '&:hover': {
         backgroundColor: theme.palette.primary.main,
      },
   })
)

export const Flex = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }))

export const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
   height: 56,
   width: 56,
   '&.Mui-disabled .MuiAvatar-root': {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled,
   },
}))

export const PageTitle = styled((props: TypographyProps) => <Typography {...props} variant="h6" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
   })
)
