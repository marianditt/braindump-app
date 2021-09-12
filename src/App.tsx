import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { SearchView } from './views/search-view'
import { Container, CssBaseline, StylesProvider } from '@material-ui/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CreateView } from './views/create-view'
import { DumpView } from './views/dump-view'
import { FloatingButton } from './components/floating-button'

export function App() {
  return withAppContext(
    <Container maxWidth={'sm'}>
      <h1>Braindump</h1>
      <Router>
        <Link to="/create">
          <FloatingButton />
        </Link>

        <Switch>
          <Route path="/create">
            <CreateView />
          </Route>
          <Route path="/dumps/:dumpId">
            <DumpView />
          </Route>
          <Route path="/">
            <SearchView />
          </Route>
        </Switch>
      </Router>
    </Container>
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
