import { CardContent, Box, IconButton, IconButtonProps } from '@mui/material'
import Card, { CardProps } from '@mui/material/Card'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

export const StyledCard = styled((props: CardProps) => <Card {...props} elevation={0} />)(({ theme }) => ({
   borderRadius: theme.shape.borderRadius,
   backgroundColor: theme.palette.primary.main,
   height: '100%',
   position: 'relative',
   paddingLeft: theme.spacing(1),
   paddingRight: theme.spacing(1),
   cursor: 'pointer',
   '&:after': {
      content: `""`,
      position: 'absolute',
      width: 210,
      height: 210,
      background: theme.palette.primary.dark,
      borderRadius: '50%',
      top: -120,
      right: -50,
      opacity: 0.5,
   },
   '&:before': {
      content: `""`,
      position: 'absolute',
      width: 150,
      height: 150,
      background: theme.palette.primary.dark,
      borderRadius: '50%',
      top: -50,
      right: -70,
   },
}))

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
   padding: theme.spacing(3),
   width: '100%',
}))

export const CardHeader = styled(Box)(() => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'flex-end',
}))

export const CardBody = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   paddingTop: theme.spacing(6),
   width: '100%',
}))

export const CardBodyDetails = styled(Box)(() => ({
   // textAlign: 'left',
   display: 'flex',
   flexDirection: 'column',
   maxWidth: '50%',
}))

export const CardSubDetailsFooterText = styled((props: TypographyProps) => (
   <Typography {...props} variant="subtitle2" noWrap />
))(({ theme }) => ({
   color: theme.palette.primary.light,
   paddingRight: theme.spacing(1),
}))

export const CardSubDetailsHeaderText = styled((props: TypographyProps) => (
   <Typography {...props} variant="h6" />
))(({ theme }) => ({
   fontWeight: theme.typography.fontWeightBold,
   color: theme.palette.primary.contrastText,
}))

export const CardAmountText = styled((props: TypographyProps) => <Typography {...props} variant="h3" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.contrastText,
   })
)

export const CardHeaderText = styled((props: TypographyProps) => <Typography {...props} variant="h5" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.light,
   })
)

export const CardSubHeaderText = styled((props: TypographyProps) => <Typography {...props} variant="h6" />)(
   ({ theme }) => ({
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.light,
      zIndex: 3,
   })
)

export const SeeAllText = styled((props: TypographyProps) => <Typography {...props} variant="h6" />)(
   ({ theme }) => ({
      paddingTop: theme.spacing(2),
      color: theme.palette.primary.contrastText,
      zIndex: 5,
   })
)

export const IconWrapper = styled(Box)(({ theme }) => ({
   padding: 5,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   borderRadius: '50%',
   backgroundColor: theme.palette.common.white,
}))
