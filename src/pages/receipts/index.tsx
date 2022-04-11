import React, { useState, useEffect } from 'react'
import useInput from '../../hooks/useInput'
import useMessageModal from '../../hooks/useMessageModal'
import SuppliersTable from '../../components/table/SuppliersTable'
import { Typography, Button, TextField, Dialog } from '@mui/material'
import useGetReceipts from '../../api/queries/useGetReceipts'
import {
   Container,
   ActionsWrapper,
   DialogBody,
   TextFieldWrapper,
   ToolbarWrapper,
   StyledDialogTitle,
   StyledButton,
} from '../../components/toolbar/Elements'
import WarningModal from '../../components/warningModal'
import MessageModal from '../../components/messageModal'
import { useNavigate } from 'react-router-dom'

export default function ReceiptsPage() {
   const { data } = useGetReceipts({ fromDate: '04-05-2022', toDate: '04-11-2022' })
   const navigate = useNavigate()

   console.log(data)
   return (
      <Container>
         <Typography variant="h5">Receipts</Typography>

         <ToolbarWrapper>
            <Button
               variant="contained"
               color="primary"
               size="small"
               disableElevation
               onClick={() => navigate('/create/receipts', { replace: true })}
            >
               Create Receipt
            </Button>
         </ToolbarWrapper>
         {/* <SuppliersTable /> */}
      </Container>
   )
}
