import { Box } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'

export const StyledContainer = styled(Box)(({ theme }) => ({
   padding: theme.spacing(3),
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
         backgroundColor: theme.palette.grey[200],
      },
      '& .MuiDataGrid-columnSeparator': {
         display: 'none',
         visibility: 'hidden',
      },
      '& .MuiDataGrid-row': {
         //  '&:nth-of-type(2n)': {
         //     backgroundColor: alpha(theme.palette.primary.accent as string, 0.5),
         //  },
         '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light as string, 0.25),
         },
      },
      //   height: '100%',
      '& .MuiDataGrid-row.Mui-selected': {
         backgroundColor: alpha(theme.palette.primary.light, 0.35),
         '&:hover': {
            backgroundColor: alpha(theme.palette.primary.light, 0.4),
         },
      },

      '& .MuiDataGrid-cell': {
         //  borderBottom: 0,
         //  '&:focus': {
         //     outline: `1px solid red`,
         //  },
         //  '&:first-child': {
         //     paddingLeft: theme.spacing(5),
         //  },
      },
   },
}))
