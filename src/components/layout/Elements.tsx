import { Box, MenuItem } from '@mui/material'
import Grid, { GridProps } from '@mui/material/Grid'
import MenuList, { MenuListProps } from '@mui/material/MenuList'
import { styled, alpha } from '@mui/material/styles'

export const LayoutContainer = styled((props: GridProps) => <Grid container {...props} />)(({ theme }) => ({
   padding: `${theme.spacing(2)} 0`,
}))

export const GridItem = styled((props: GridProps) => <Grid item {...props} />)(() => ({}))

export const SidebarContainer = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3),
   // position: 'fixed',
   paddingTop: 0,
   height: '100vh',
   overflowY: 'auto',
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
