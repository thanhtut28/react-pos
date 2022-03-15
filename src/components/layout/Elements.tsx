import { Box } from '@mui/material'
import List, { ListProps } from '@mui/material/List'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import Drawer, { DrawerProps } from '@mui/material/Drawer'

import { styled } from '@mui/material/styles'

const drawerWidth = 260
const marginWidth = 20

export const MainContainer = styled(Box)<{ openSidebar: boolean }>(({ theme, openSidebar }) => ({
   backgroundColor: theme.palette.secondary.accent,
   borderTopLeftRadius: theme.shape.borderRadius,
   borderTopRightRadius: theme.shape.borderRadius,
   width: `calc(100% - ${drawerWidth + marginWidth}px)`,
   marginRight: marginWidth,
   transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.standard,
   }),
   flexGrow: 1,

   padding: theme.spacing(2),
   marginBottom: theme.spacing(-2),
   [theme.breakpoints.up('md')]: {
      marginLeft: openSidebar ? 0 : -(drawerWidth - marginWidth),
   },
   [theme.breakpoints.down('md')]: {
      marginLeft: marginWidth,
   },
}))

export const LayoutContainer = styled(Box)(() => ({
   display: 'flex',
}))

export const SidebarContainer = styled(Box)<{ openSidebar?: boolean }>(({ theme, openSidebar }) => ({
   padding: theme.spacing(3),
   paddingTop: 0,
   flexShrink: 0,
   width: drawerWidth,
   transform: openSidebar ? 'none' : `translateX(-260px)`,
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
   }),
}))

export const SidebarMenu = styled((props: ListProps) => <List {...props} />)(() => ({
   // width: '100%',
   // maxWidth: 250,
   // margin: '0 auto',
}))

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
