import { Box, MenuItem } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import MenuList, { MenuListProps } from '@mui/material/MenuList'
import { styled, alpha } from '@mui/material/styles'

export const LayoutContainer = styled((props: StackProps) => <Stack direction="row" {...props} />)(
   ({ theme }) => ({
      padding: `${theme.spacing(2)} 0`,
   })
)

export const SidebarContainer = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
   padding: theme.spacing(3),
   // position: 'fixed',
   paddingTop: 0,
   overflowY: 'auto',
   width: 260,
   flexShrink: 0,
   transform: open ? 'none' : `translateX(-260px)`,
   transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.standard,
   }),
}))

export const SidebarMenu = styled((props: MenuListProps) => <MenuList {...props} />)(() => ({
   // width: '100%',
   // maxWidth: 250,
   // margin: '0 auto',
}))

export const SidebarMenuItem = styled(MenuItem)<{ active: boolean }>(({ theme, active }) => ({
   marginTop: theme.spacing(1.5),
   marginBottom: theme.spacing(1.5),
   paddingTop: theme.spacing(1.5),
   paddingBottom: theme.spacing(1.5),
   color: active ? theme.palette.primary.main : theme.palette.grey[700],
   backgroundColor: active ? alpha(theme.palette.primary.main, 0.15) : 'transparent',
   borderRadius: 10,
   '& .MuiSvgIcon-root': {
      color: active ? theme.palette.primary.main : 'inherit',
   },
   '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.15),
      color: theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
         color: theme.palette.primary.main,
      },
   },
}))
