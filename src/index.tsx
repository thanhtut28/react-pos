import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import reportWebVitals from './reportWebVitals'
import theme from './theme'
import LayoutContextProvider from './contexts/LayoutContext'
import AuthContextProvider from './contexts/AuthContext'
import Routes from './routes'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { client } from './api'

ReactDOM.render(
   <React.StrictMode>
      <QueryClientProvider client={client}>
         <BrowserRouter>
            <ThemeProvider theme={theme}>
               <AuthContextProvider>
                  <LayoutContextProvider>
                     <CssBaseline />
                     <Routes />
                  </LayoutContextProvider>
               </AuthContextProvider>
            </ThemeProvider>
         </BrowserRouter>
         {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
   </React.StrictMode>,
   document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
