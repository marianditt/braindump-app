import { CssBaseline, StylesProvider } from '@material-ui/core'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './App'
import { GlobalStyle } from './global-styles'
import { reportWebVitals } from './reportWebVitals'
import { store } from './store/store'

ReactDOM.render(withAppContext(<App />), document.getElementById('root'))

function withAppContext(element: JSX.Element): JSX.Element {
  return (
    <StrictMode>
      <CssBaseline />
      <StylesProvider injectFirst>
        <GlobalStyle />
        <Provider store={store}>{element}</Provider>
      </StylesProvider>
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
