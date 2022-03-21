import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import Layout from './components/layout'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import LayoutContextProvider from './contexts/LayoutContext'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <ThemeProvider theme={theme}>
            <LayoutContextProvider>
               <CssBaseline />
               <Routes />
            </LayoutContextProvider>
         </ThemeProvider>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
