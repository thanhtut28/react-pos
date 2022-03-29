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
}

export default function DeleteModal({ open, onClose, onSubmit }: Props) {
   return (
      <Dialog open={open} onClose={onClose}>
         <StyledDialogTitle>Please Confirm</StyledDialogTitle>
         <DialogWrapper noValidate autoComplete="off" onSubmit={onSubmit}>
            <DialogBody>
               <ReportProblemIcon color="error" />
               <WarningText>Are you sure want to delete this entry?</WarningText>
            </DialogBody>
            <DialogFooter>
               <ActionsWrapper>
                  <StyledButton size="small" variant="outlined" onClick={onClose}>
                     Cancel
                  </StyledButton>
                  <StyledButton color="error" size="small" variant="contained" type="submit">
                     Confirm
                  </StyledButton>
               </ActionsWrapper>
            </DialogFooter>
         </DialogWrapper>
      </Dialog>
   )
}
