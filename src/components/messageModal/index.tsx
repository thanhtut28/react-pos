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
         autoHideDuration={2000}
         onClose={handleClose}
         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
         <Alert variant="filled" severity={variant}>
            {message}
         </Alert>
      </Snackbar>
   )
}
