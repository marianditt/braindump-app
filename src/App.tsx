import React, { ChangeEvent, useRef } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import { SearchDumpsView } from './views/search-dumps-view'
import { Container } from '@material-ui/core'
import { RootState, store, useAppDispatch } from './store/store'
import { CreateDumpView } from './views/create-dump-view'
import { ShowDumpView } from './views/show-dump-view'
import { FloatingButton } from './components/floating-button'
import { EditDumpView } from './views/edit-dump-view'
import { AppBar } from './components/header/app-bar'
import { exportState, importState } from './services/import-export-service'
import { setDumps } from './store/dump-store'
import { MenuAction } from './types/menu-action-types'
import { MenuButton } from './components/header/menu-button'
import { BackButton } from './components/header/back-button'

export function App() {
  const dispatch = useAppDispatch()
  const history = useHistory<string>()

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

  const onBack = () => {
    history.goBack()
  }

  return (
    <>
      <AppBar title="Braindump">
        {history.length === 0 ? <MenuButton actions={menuActions} /> : <BackButton onBack={onBack} />}
      </AppBar>
      <input
        type="file"
        ref={inputFile}
        accept={'application/json, .json'}
        onChange={onFileChoice}
        style={{ display: 'none' }}
      />

      <Container maxWidth="xl">
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
      </Container>
    </>
  )
}
