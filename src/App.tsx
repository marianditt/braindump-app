import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DumpCreatorPage } from './components/pages/dump-creator-page'
import { DumpDetailsPage } from './components/pages/dump-details-page'
import { DumpEditorPage } from './components/pages/dump-editor-page'
import { DumpSearchPage } from './components/pages/dump-search-page'

export function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/create">
          <DumpCreatorPage />
        </Route>
        <Route path="/edit/dumps/:dumpId">
          <DumpEditorPage />
        </Route>
        <Route path="/show/dumps/:dumpId">
          <DumpDetailsPage />
        </Route>
        <Route path="/">
          <DumpSearchPage />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}
