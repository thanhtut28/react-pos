import { Box } from '@mui/material'
import Stack, { StackProps } from '@mui/material/Stack'
import { alpha, styled } from '@mui/material/styles'

export const DashboardContainer = styled(Box)(({ theme }) => ({
   backgroundColor: alpha(theme.palette.primary.main, 0.2),
   borderTopLeftRadius: 50,
   borderTopRightRadius: 50,
   padding: theme.spacing(1),
   /**
    * @WillDel
    */
   width: `calc(100vw - 280px)`,
   height: `calc(100vh - 150px)`,
}))

export const DashboardWrapper = styled((props: StackProps) => <Stack {...props} spacing={2} />)(
   ({ theme }) => ({
      padding: theme.spacing(1),
   })
)

export const CardsWrapper = styled((props: StackProps) => <Stack direction="row" {...props} />)(
   ({ theme }) => ({
      flexWrap: 'wrap',
   })
)
