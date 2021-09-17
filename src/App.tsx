import React, { StrictMode } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { SearchDumpsView } from './views/search-dumps-view'
import { Container, CssBaseline, StylesProvider } from '@material-ui/core'
import { store } from './store/store'
import { Provider } from 'react-redux'
import { CreateDumpView } from './views/create-dump-view'
import { ShowDumpView } from './views/show-dump-view'
import { FloatingButton } from './components/floating-button'
import { EditDumpView } from './views/edit-dump-view'
import { AppBar } from './components/app-bar-component'

const exportAction = () => {
  const jsonData = window.localStorage.getItem('dumps')

  const fileData = JSON.stringify(jsonData)
  const blob = new Blob([fileData], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.download = 'braindump.json'
  link.href = url
  link.click()
}

export function App() {
  const menuActions = [{ title: 'Export', action: exportAction }]

  return withAppContext(
    <Container maxWidth="sm">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppBar title="Braindump" actions={menuActions} />

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
