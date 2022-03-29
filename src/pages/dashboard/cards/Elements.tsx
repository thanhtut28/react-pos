import Grid, { GridProps } from '@mui/material/Grid'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.common.white,
   borderRadius: 12,
   padding: theme.spacing(1),
}))

export const Heading = styled((props: TypographyProps) => <Typography {...props} variant="h6" />)(
   ({ theme }) => ({
      padding: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
   })
)

export const CardsWrapper = styled((props: GridProps) => <Grid {...props} container />)(() => ({
   display: 'flex',
   flexWrap: 'wrap',
   //    paddingRight: theme.spacing(2),
   //    marginLeft: theme.spacing(-2),
   //    marginTop: theme.spacing(-2),
}))

export const CardWrapper = styled((props: GridProps) => (
   <Grid {...props} item xl={3} lg={4} md={6} xs={12} />
))(({ theme }) => ({
   padding: theme.spacing(1),
}))
