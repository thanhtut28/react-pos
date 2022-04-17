import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

export const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.common.white,
   //    display: 'flex',
   //    height: '80vh',
}))

export const StyledTableWrapper = styled(Box)(({ theme }) => ({
   //    height: 600,
   //    width: '100%',
   //    flexGrow: 1,
   '& .MuiDataGrid-root': {
      //   border: 10,
      //   padding: 10
      borderRadius: 0,
      //   boxShadow: theme.shadows[1],
      '& .table--header': {
         backgroundColor: theme.palette.primary.main,
         color: theme.palette.common.white,
      },
      '& .MuiDataGrid-columnSeparator': {
         display: 'none',
         visibility: 'hidden',
      },
      '& .MuiDataGrid-row': {
         fontWeight: theme.typography.fontWeightMedium,
         '&:nth-of-type(2n)': {
            backgroundColor: alpha(theme.palette.secondary.accent as string, 0.8),
         },

         '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main as string, 0.2),
         },
      },
      //   height: '100%',
      '& .MuiDataGrid-row.Mui-selected': {
         backgroundColor: alpha(theme.palette.secondary.main, 0.35),
         '&:hover': {
            backgroundColor: alpha(theme.palette.secondary.main, 0.4),
         },
      },

      '& .MuiDataGrid-cell': {
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
