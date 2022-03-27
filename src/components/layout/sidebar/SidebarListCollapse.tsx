import { useState } from 'react'
import { PageInterface, Type } from '../../../dummy'
import SidebarListItem from './SidebarListItem'
import { SidebarListItem as StyledListItemButton } from './Elements'
import { List, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import { FiberManualRecord } from '@mui/icons-material'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'

interface Props {
   item: PageInterface
   level: number
}

export default function SidebarListCollapse({ item, level }: Props) {
   const Icon = item.icon
   const itemIcon = item?.icon ? <Icon fontSize="small" /> : <FiberManualRecord fontSize="small" />

   const [open, setOpen] = useState<boolean>(false)

   const menus = item?.children?.map((itm) => {
      switch (itm.type) {
         case Type.item:
            return <SidebarListItem key={itm.id} item={itm} level={level + 1} />
         case Type.collapse:
            return <SidebarListCollapse key={item.id} item={itm} level={level + 1} />
         default:
            return
      }
   })

   return (
      <>
         <StyledListItemButton
            selected={open}
            onClick={() => setOpen((prev) => !prev)}
            sx={{ pl: level > 0 ? level * 4 : 2 }}
         >
            <ListItemIcon>{itemIcon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {open ? <ExpandLess /> : <ExpandMore />}
         </StyledListItemButton>
         <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
               {menus}
            </List>
         </Collapse>
      </>
   )
}
