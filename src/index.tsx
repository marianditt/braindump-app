import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { reportWebVitals } from './reportWebVitals'
import { CssBaseline, StylesProvider } from '@material-ui/core'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(withAppContext(<App />), document.getElementById('root'))

function withAppContext(element: JSX.Element): JSX.Element {
  return (
    <StrictMode>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Provider store={store}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>{element}</BrowserRouter>
        </Provider>
      </StylesProvider>
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
