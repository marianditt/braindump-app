import React, { StrictMode } from 'react'
import { BrowserRouter as Router, Link as RouterLink, Route, Switch } from 'react-router-dom'
import { SearchDumpsView } from './views/search-dumps-view'
import { Container, CssBaseline, Link, StylesProvider } from '@material-ui/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CreateDumpView } from './views/create-dump-view'
import { ShowDumpView } from './views/show-dump-view'
import { FloatingButton } from './components/floating-button'
import { EditDumpView } from './views/edit-dump-view'

export function App() {
  return withAppContext(
    <Container maxWidth={'sm'}>
      <Link href="/" color="inherit">
        <h1>Braindump</h1>
      </Link>
      <Router>
        <RouterLink to="/create">
          <FloatingButton />
        </RouterLink>

        <Switch>
          <Route path="/create">
            <CreateDumpView />
          </Route>
          <Route path="/edit/dumps/:dumpId">
            <EditDumpView />
          </Route>
          <Route path="/show/dumps/:dumpId">
            <ShowDumpView />
          </Route>
          <Route path="/">
            <SearchDumpsView />
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
