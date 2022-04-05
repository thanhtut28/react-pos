import { createTheme, responsiveFontSizes } from '@mui/material'
import { blue, deepPurple, red } from '@mui/material/colors'
import '@mui/lab/themeAugmentation'

declare module '@mui/material/styles' {
   interface PaletteColor {
      accent?: string
   }
   interface SimplePaletteColorOptions {
      accent?: string
   }

   interface Shape {
      rounded?: number | string
   }
}

let theme = createTheme({
   palette: {
      secondary: {
         light: blue[200],
         main: blue[600],
         dark: blue[800],
         accent: blue[50],
      },
      primary: {
         light: deepPurple[200],
         main: deepPurple[600],
         dark: deepPurple[800],
         accent: deepPurple[50],
      },
      error: {
         light: red[200],
         main: red[500],
         dark: red[800],
      },
   },
   shape: {
      // borderRadius: 12,
   },
})

theme = responsiveFontSizes(theme)

export default theme
