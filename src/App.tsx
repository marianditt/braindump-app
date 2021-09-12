import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { SearchView } from './views/search-view'
import { CssBaseline, StylesProvider } from '@material-ui/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CreateView } from './views/create-view'

export function App() {
  return withAppContext(
    <Router>
      <Switch>
        <Route path="/create">
          <CreateView />
        </Route>
        <Route path="/">
          <SearchView />
        </Route>
      </Switch>
    </Router>
  )
}

function withAppContext(element: JSX.Element): JSX.Element {
  return (
    <StrictMode>
      <CssBaseline />
      <StylesProvider injectFirst>
        <Provider store={store}>{element}</Provider>
      </StylesProvider>
    </StrictMode>
  )
}
