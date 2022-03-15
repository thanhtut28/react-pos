import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'
import List, { ListProps } from '@mui/material/List'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import { drawerWidth } from '../../../constants/drawer'

export const SidebarContainer = styled(Box)<{ openSidebar?: boolean }>(({ theme, openSidebar }) => ({
   flexShrink: 0,
   width: drawerWidth,
   transform: openSidebar ? 'none' : `translateX(-260px)`,
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
   }),
}))

export const SidebarWrapper = styled(Box)(({ theme }) => ({
   position: 'fixed',
   width: drawerWidth,
   padding: theme.spacing(3),
   paddingTop: 0,
}))

export const SidebarMenu = styled((props: ListProps) => <List {...props} />)()

export const SidebarListItem = styled((props: ListItemButtonProps) => <ListItemButton {...props} />)<{
   active: boolean
}>(({ theme, active }) => ({
   marginTop: theme.spacing(1.5),
   marginBottom: theme.spacing(1.5),
   color: active ? theme.palette.primary.main : theme.palette.grey[700],
   backgroundColor: active ? theme.palette.primary.accent : 'transparent',
   borderRadius: theme.shape.borderRadius,
   '& .MuiListItemIcon-root': {
      minWidth: 36,
   },
   '& .MuiSvgIcon-root': {
      color: active ? theme.palette.primary.main : 'inherit',
   },
   '& .MuiTypography-root': {
      fontWeight: active ? theme.typography.fontWeightBold : 'normal',
   },
   '&:hover': {
      backgroundColor: theme.palette.primary.accent,
      color: theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
         color: theme.palette.primary.main,
      },
   },
}))

// Sidebar Drawer

export const SidebarDrawerContainer = styled((props: DrawerProps) => (
   <Drawer
      {...props}
      ModalProps={{
         keepMounted: true,
      }}
   />
))(({ theme }) => ({
   width: drawerWidth,
   padding: theme.spacing(3),
   paddingTop: 0,
   '& .MuiPaper-root': {
      width: drawerWidth,
      padding: theme.spacing(3),
   },
}))
