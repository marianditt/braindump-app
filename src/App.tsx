import React, { ChangeEvent, useRef } from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import { SearchDumpsView } from './views/search-dumps-view'
import { Container } from '@material-ui/core'
import { RootState, store, useAppDispatch } from './store/store'
import { CreateDumpView } from './views/create-dump-view'
import { ShowDumpView } from './views/show-dump-view'
import { FloatingButton } from './components/floating-button'
import { EditDumpView } from './views/edit-dump-view'
import { AppBar } from './components/app-bar'
import { exportState, importState } from './services/import-export-service'
import { setDumps } from './store/dump-store'
import { MenuAction } from './types/menu-action-types'

export function App() {
  const dispatch = useAppDispatch()

  const exportAction = () => {
    const state: RootState = store.getState()
    exportState(state)
  }

  const inputFile = useRef<HTMLInputElement | null>(null)

  const importAction = () => {
    inputFile.current?.click()
  }

  const onFileChoice = async (event: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = event.target.files?.[0] || null
    if (file !== null) {
      const state: RootState = await importState(file)
      dispatch(setDumps(state.dumps))
    }
  }

  const menuActions: MenuAction[] = [
    { title: 'Export', action: exportAction },
    { title: 'Import', action: importAction },
  ]

  return (
    <Container>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <AppBar title="Braindump" actions={menuActions} />
        <input
          type="file"
          ref={inputFile}
          accept={'application/json, .json'}
          onChange={onFileChoice}
          style={{ display: 'none' }}
        />

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
