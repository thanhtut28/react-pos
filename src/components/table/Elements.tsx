import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { gridClasses } from '@mui/x-data-grid'

export const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.common.white,
}))

export const StyledTableWrapper = styled(Box)(({ theme }) => ({
   [`& .${gridClasses.root}`]: {
      borderRadius: 0,
      '& .table--header': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.common.white,
      },
      [`& .${gridClasses['columnSeparator']}`]: {
         display: 'none',
         visibility: 'hidden',
      },
      [`& .${gridClasses.row}`]: {
         fontWeight: theme.typography.fontWeightMedium,
         // '&:nth-of-type(2n)': {
         //    backgroundColor: alpha(theme.palette.secondary.accent as string, 0.8),
         // },

         '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.accent as string, 0.7),
         },
         '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.35),
            '&:hover': {
               backgroundColor: alpha(theme.palette.secondary.main, 0.4),
            },
         },
      },

      [`& .${gridClasses.cell}`]: {
         borderBottom: 0,
         //  '&:focus': {
         //     outline: `1px solid red`,
         //  },
         //  '&:first-child': {
         //     paddingLeft: theme.spacing(5),
         //  },
      },
   },
}))
