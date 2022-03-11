import { Box } from '@mui/material'
import Card, { CardProps } from '@mui/material/Card'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const StyledCard = styled((props: CardProps) => <Card {...props} elevation={10} />)(({ theme }) => ({
   padding: theme.spacing(3),
   margin: theme.spacing(3),
   width: 200,
   height: 150,
   borderRadius: 20,
}))

export const CardHeader = styled(Box)(({ theme }) => ({
   paddingTop: theme.spacing(1),
   paddingBottom: theme.spacing(1),
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-end',
}))

export const CardHeaderText = styled((props: TypographyProps) => <Typography {...props} variant="h6" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
   })
)

export const CardHeaderSubtitle = styled((props: TypographyProps) => (
   <Typography {...props} variant="subtitle1" />
))(({ theme }) => ({
   color: theme.palette.grey[800],
}))
