import { useState } from 'react'

export default function useMessageModal() {
   const [openMessageModal, setOpenMessageModal] = useState<boolean>(false)
   const [message, setMessage] = useState<string>('')

   const handleOpenMessageModal = () => {
      setOpenMessageModal(true)
   }

   const handleCloseMessageModal = () => {
      setOpenMessageModal(false)
   }

   const handleSetMessage = (message: string) => {
      setMessage(message)
   }

   return {
      openMessageModal,
      message,
      handleCloseMessageModal,
      handleOpenMessageModal,
      handleSetMessage,
   }
}
