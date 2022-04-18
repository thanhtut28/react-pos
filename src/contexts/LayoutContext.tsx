import React, { createContext, useContext, useState, useEffect } from 'react'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

interface LayoutContextInterface {
   openSidebar: boolean
   openWarningModal: boolean
   handleToggleSidebar: () => void
   handleCloseSidebar: () => void
   handleOpenWarningModal: () => void
   handleCloseWarningModal: () => void
   destinationRoute: string | null
   setDestinationRoute: React.Dispatch<React.SetStateAction<string | null>>
}

const LayoutContext = createContext({} as LayoutContextInterface)

export const useLayoutContext = () => {
   return useContext(LayoutContext)
}

export default function LayoutContextProvider({ children }: { children: React.ReactNode }) {
   const theme = useTheme()
   const isMobile = useMediaQuery(theme.breakpoints.down('md'))
   const [openSidebar, setOpenSidebar] = useState<boolean>(true)
   const [openWarningModal, setOpenWarningModal] = useState<boolean>(false)
   const [destinationRoute, setDestinationRoute] = useState<string | null>(null)

   const handleToggleSidebar = () => {
      setOpenSidebar((prev) => !prev)
   }

   const handleCloseSidebar = () => {
      setOpenSidebar(false)
   }

   const handleOpenWarningModal = () => {
      setOpenWarningModal(true)
   }

   const handleCloseWarningModal = () => {
      setOpenWarningModal(false)
   }

   useEffect(() => {
      if (isMobile) {
         setOpenSidebar(false)
      }
   }, [isMobile])

   const layoutContext = {
      openSidebar,
      openWarningModal,
      handleToggleSidebar,
      handleCloseWarningModal,
      handleOpenWarningModal,
      destinationRoute,
      setDestinationRoute,
      handleCloseSidebar,
   }
   return <LayoutContext.Provider value={layoutContext}>{children}</LayoutContext.Provider>
}
