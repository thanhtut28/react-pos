import { Snackbar, Alert } from '@mui/material'

interface Props {
   open: boolean
   onClose: () => void
   message: string
   isSuccessMessage: boolean
}

export default function SuccessModal({ open, onClose, message, isSuccessMessage }: Props) {
   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return
      }

      onClose()
   }

   return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert variant="filled" severity={isSuccessMessage ? 'success' : 'error'}>
            {message}
         </Alert>
      </Snackbar>
   )
}
