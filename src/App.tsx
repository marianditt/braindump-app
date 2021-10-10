import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
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
import { Dump } from './types/dump-types'
import { CancelButton } from './components/header/cancel-button'

type Mode = string
type SetMode = React.Dispatch<React.SetStateAction<Mode>>

export function App() {
  const dispatch = useAppDispatch()
  const history = useHistory<string>()

  const initialMode: Mode = 'home'
  const [mode, setMode]: [Mode, SetMode] = useState(initialMode)

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

  const onHistoryChange = () => {
    const isHome = history.location.pathname === '/'
    const isCreate = history.location.pathname.startsWith('/create')
    const isEdit = history.location.pathname.startsWith('/edit')
    if (isHome) {
      setMode('home')
    } else if (isCreate || isEdit) {
      setMode('editing')
    } else {
      setMode('viewing')
    }
  }

  useEffect(() => {
    onHistoryChange()
    return history.listen(onHistoryChange)
  })

  const navigateHome = () => {
    navigateTo('/')
  }

  const navigateToCreate = () => {
    navigateTo('/create')
  }

  const navigateToEdit = (dump: Dump) => {
    navigateTo(`/edit/dumps/${dump.id}`)
  }

  const navigateTo = (route: string) => {
    if (mode === 'home') {
      history.push(route)
    } else {
      history.replace(route)
    }
  }

  return (
    <>
      <AppBar title="Braindump">
        {mode === 'home' ? <MenuButton actions={menuActions} /> : null}
        {mode === 'editing' ? <CancelButton onCancel={navigateHome} /> : null}
        {mode === 'viewing' ? <BackButton onBack={navigateHome} /> : null}
      </AppBar>
      <input
        type="file"
        ref={inputFile}
        accept={'application/json, .json'}
        onChange={onFileChoice}
        style={{ display: 'none' }}
      />

      <Container maxWidth="xl">
        <FloatingButton onClick={navigateToCreate} />

        <Switch>
          <Route path="/create">
            <CreateDumpView onSave={navigateToEdit} onCancel={navigateHome} />
          </Route>
          <Route path="/edit/dumps/:dumpId">
            <EditDumpView />
          </Route>
          <Route path="/show/dumps/:dumpId">
            <ShowDumpView onEdit={navigateToEdit} />
          </Route>
          <Route path="/">
            <SearchDumpsView />
          </Route>
        </Switch>
      </Container>
    </>
  )
}
