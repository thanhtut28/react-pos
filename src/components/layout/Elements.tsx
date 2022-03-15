import { Box } from '@mui/material'
import AppBar, { AppBarProps } from '@mui/material/AppBar'
import Toolbar, { ToolbarProps } from '@mui/material/Toolbar'
import Avatar, { AvatarProps } from '@mui/material/Avatar'
import { styled } from '@mui/material/styles'
import { drawerWidth, marginWidth } from '../../constants/drawer'

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

export const LayoutContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   paddingTop: theme.spacing(3),
}))

export const Offset = styled('div')(({ theme }) => theme.mixins.toolbar)

// <---------------- Header --------------->

export const StyledAppBar = styled((props: AppBarProps) => <AppBar {...props} elevation={0} />)()

export const StyledToolbar = styled((props: ToolbarProps) => <Toolbar {...props} />)(({ theme }) => ({
   backgroundColor: theme.palette.common.white,
   paddingTop: theme.spacing(2),
   paddingBottom: theme.spacing(2),
}))

export const StyledAvatar = styled((props: AvatarProps) => <Avatar {...props} variant="rounded" />)(
   ({ theme }) => ({
      backgroundColor: theme.palette.primary.accent,
      color: theme.palette.primary.main,
      '&:hover': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.primary.light,
      },
   })
)

export const ToggleBarWrapper = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   width: 200,
}))
