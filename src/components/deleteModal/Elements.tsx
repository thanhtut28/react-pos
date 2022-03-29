import { Box, Typography, TypographyProps, DialogTitle, Button, ButtonProps } from '@mui/material'
import { styled } from '@mui/material/styles'
import theme from 'src/theme'

export const DialogWrapper = styled('form')(() => ({}))

export const DialogBody = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   padding: theme.spacing(5),
}))

export const StyledDialogTitle = styled(DialogTitle)(() => ({
   textAlign: 'center',
}))

export const WarningText = styled((props: TypographyProps) => <Typography {...props} variant="subtitle2" />)(
   ({ theme }) => ({
      color: theme.palette.error.main,
      textAlign: 'center',
      paddingTop: theme.spacing(3),
   })
)

export const DialogFooter = styled(Box)(({ theme }) => ({
   width: '100%',
   backgroundColor: theme.palette.grey[300],
   padding: theme.spacing(3),
}))

export const ActionsWrapper = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'center',
   width: '100%',
   paddingLeft: theme.spacing(2),
   paddingRight: theme.spacing(2),
}))

export const StyledButton = styled((props: ButtonProps) => <Button {...props} disableElevation />)(
   ({ theme }) => ({
      width: 120,
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
   })
)
