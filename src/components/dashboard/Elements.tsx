import Stack, { StackProps } from '@mui/material/Stack'
import { styled } from '@mui/material/styles'

export const MainWrapper = styled((props: StackProps) => <Stack {...props} spacing={2} />)(() => ({
   // marginTop: theme.spacing(-2),
   // marginLeft: theme.spacing(-2),
}))
