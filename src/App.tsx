import React, { StrictMode } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { SearchDumpsView } from './views/search-dumps-view'
import { Container, CssBaseline, Link as MaterialLink, StylesProvider } from '@material-ui/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CreateDumpView } from './views/create-dump-view'
import { ShowDumpView } from './views/show-dump-view'
import { FloatingButton } from './components/floating-button'
import { EditDumpView } from './views/edit-dump-view'

export function App() {
  return withAppContext(
    <Container maxWidth={'sm'}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <MaterialLink color="inherit" component={Link} to={'/'}>
          <h1>Braindump</h1>
        </MaterialLink>
        <Link to="/create">
          <FloatingButton />
        </Link>

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
      </BrowserRouter>
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
