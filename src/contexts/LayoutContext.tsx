import React, { createContext, useContext, useState } from 'react'

interface LayoutContextInterface {
   openSidebar: boolean
   handleToggleSidebar: () => void
}

const LayoutContext = createContext({} as LayoutContextInterface)

export const useLayoutContext = () => {
   return useContext(LayoutContext)
}

export default function LayoutContextProvider({ children }: { children: React.ReactNode }) {
   const [openSidebar, setOpenSidebar] = useState<boolean>(true)

   const handleToggleSidebar = () => {
      setOpenSidebar((prev) => !prev)
   }

   const layoutContext = {
      openSidebar,
      handleToggleSidebar,
   }
   return <LayoutContext.Provider value={layoutContext}>{children}</LayoutContext.Provider>
}
