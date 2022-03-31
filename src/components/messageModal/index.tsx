import { Snackbar, Alert, AlertColor } from '@mui/material'

interface Props {
   open: boolean
   onClose: () => void
   message: string
   variant: AlertColor
}

export default function MessageModal({ open, onClose, message, variant }: Props) {
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }

      onClose()
   }

   return (
      <Snackbar
         open={open}
         autoHideDuration={6000}
         onClose={handleClose}
         sx={{
            '&.MuiSnackbar-root': {
               bottom: variant === 'success' ? 24 : 90,
            },
         }}
      >
         <Alert variant="filled" severity={variant} onClose={handleClose}>
            {message}
         </Alert>
      </Snackbar>
   )
}
