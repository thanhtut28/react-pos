import { Dialog } from '@mui/material'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import {
   ActionsWrapper,
   DialogWrapper,
   DialogBody,
   StyledDialogTitle,
   WarningText,
   DialogFooter,
   StyledButton,
} from './Elements'

interface Props {
   open: boolean
   onClose: () => void
   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
   action: string
   proceedTitle: string
}

export default function DeleteModal({ open, onClose, onSubmit, action, proceedTitle }: Props) {
   return (
      <Dialog open={open} onClose={onClose}>
         <StyledDialogTitle>Please Confirm</StyledDialogTitle>
         <DialogWrapper noValidate autoComplete="off" onSubmit={onSubmit}>
            <DialogBody>
               <ReportProblemIcon color="error" />
               <WarningText>{`Are you sure want to ${action}?`}</WarningText>
            </DialogBody>
            <DialogFooter>
               <ActionsWrapper>
                  <StyledButton size="small" variant="outlined" onClick={onClose}>
                     Cancel
                  </StyledButton>
                  <StyledButton disableElevation color="error" size="small" variant="contained" type="submit">
                     {proceedTitle}
                  </StyledButton>
               </ActionsWrapper>
            </DialogFooter>
         </DialogWrapper>
      </Dialog>
   )
}
