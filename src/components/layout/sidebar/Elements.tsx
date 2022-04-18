import { styled } from '@mui/material/styles'
import {
   Box,
   Typography,
   TypographyProps,
   svgIconClasses,
   typographyClasses,
   listItemIconClasses,
   paperClasses,
} from '@mui/material'
import List, { ListProps } from '@mui/material/List'
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton'
import Drawer, { DrawerProps } from '@mui/material/Drawer'
import { drawerWidth } from '../../../constants/drawer'

export const SidebarContainer = styled(Box)<{ openSidebar?: boolean }>(({ theme, openSidebar }) => ({
   flexShrink: 0,
   width: drawerWidth,
   transform: openSidebar ? 'none' : `translateX(-${drawerWidth}px)`,
   // transition: theme.transitions.create('transform', {
   //    duration: theme.transitions.duration.standard,
   // }),
}))

export const SidebarWrapper = styled(Box)(({ theme }) => ({
   position: 'fixed',
   width: drawerWidth,
   padding: theme.spacing(3),
   paddingTop: 0,
   height: 'calc(100% - 80px)',
   overflow: 'auto',
}))

export const SidebarMenu = styled((props: ListProps) => <List {...props} />)(() => ({}))

export const SidebarListItem = styled((props: ListItemButtonProps) => <ListItemButton {...props} />)(
   ({ theme }) => ({
      marginTop: theme.spacing(1.5),
      marginBottom: theme.spacing(1.5),
      color: theme.palette.grey[700],
      borderRadius: theme.shape.borderRadius,
      [`& .${listItemIconClasses.root}`]: {
         minWidth: 36,
      },
      '&.Mui-selected': {
         color: theme.palette.primary.main,
         backgroundColor: theme.palette.primary.accent,
         [`& .${typographyClasses.root}`]: {
            fontWeight: theme.typography.fontWeightBold,
         },
         [`& .${svgIconClasses.root}`]: {
            color: theme.palette.primary.main,
         },
      },
      '&:hover': {
         backgroundColor: theme.palette.primary.accent,
         color: theme.palette.primary.main,
         [`& .${svgIconClasses.root}`]: {
            color: theme.palette.primary.main,
         },
      },
   })
)

export const Username = styled((props: TypographyProps) => <Typography {...props} variant="h5" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      textAlign: 'center',
      color: theme.palette.primary.dark,
   })
)

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
   [`& .${paperClasses.root}`]: {
      width: drawerWidth,
      padding: theme.spacing(3),
   },
}))
