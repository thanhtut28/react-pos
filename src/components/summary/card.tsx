import { Box, Card, CardContent, Typography } from '@mui/material'

interface Balance {
   title: string
   value: number
}

interface Props {
   balances: Balance[]
}

export default function SummaryCard({ balances }: Props) {
   return (
      <Card
         sx={{
            width: 1,
            maxWidth: 400,
            boxShadow: (theme) => theme.shadows[4],
            borderRadius: 3,
            my: 2,
            bgcolor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.common.white,
         }}
      >
         <CardContent>
            {balances.map((balance, index) => (
               <Box
                  key={`${balance.title}${index}`}
                  py={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
               >
                  <Typography variant="subtitle2" sx={{ color: (theme) => theme.palette.grey[200] }}>
                     {balance.title}
                  </Typography>
                  <Typography
                     variant="subtitle1"
                     sx={{ fontWeight: (theme) => theme.typography.fontWeightBold, pl: 2 }}
                  >
                     {`${Number(balance.value).toLocaleString()} Ks`}
                  </Typography>
               </Box>
            ))}
         </CardContent>
      </Card>
   )
}
