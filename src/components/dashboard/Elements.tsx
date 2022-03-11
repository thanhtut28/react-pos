import { Box } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled } from '@mui/material/styles'

export const DashboardContainer = styled(Box)<{ openSidebar: boolean }>(({ theme, openSidebar }) => ({
   backgroundColor: theme.palette.secondary.accent,
   borderTopLeftRadius: theme.shape.borderRadius,
   borderTopRightRadius: theme.shape.borderRadius,

   /**
    * @WillDel
    */
   height: '100vh',
   width: 'calc(100% - 260px)',
   marginLeft: openSidebar ? 0 : -240,
   marginRight: 20,
   transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.standard,
   }),
   flexGrow: 1,
   padding: theme.spacing(2),
}))

export const DashboardWrapper = styled((props: StackProps) => <Stack {...props} spacing={2} />)(
   ({ theme }) => ({
      marginTop: theme.spacing(-2),
      marginLeft: theme.spacing(-2),
   })
)

export const CardsWrapper = styled((props: GridProps) => <Grid {...props} container />)(({ theme }) => ({
   display: 'flex',
   flexWrap: 'wrap',
}))

export const CardWrapper = styled((props: GridProps) => <Grid {...props} item lg={3} sm={6} xs={12} />)(
   ({ theme }) => ({
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
   })
)
