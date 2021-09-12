import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import { SearchBar } from './components/search-bar'
import { SearchResultItem, SearchResultList } from './components/search-result-list'
import { useAppSelector } from './store/store'
import { Dump } from './store/dumps'
import { createSearchHash, scoreSearchable } from './services/search-service'

interface SearchState {
  filter: string
}

type SetSearchState = (state: SearchState) => void

function scoreDump(dump: Dump, filter: string): number {
  const searchableDump = createSearchHash(dump.summary, dump.description, ...dump.tags)
  const searchableFilter = createSearchHash(filter)
  return scoreSearchable(searchableDump, searchableFilter)
}

function filterDumps(dumps: Dump[], scores: number[]): Dump[] {
  const maxScore = Math.max(...scores)
  if (maxScore === 0) {
    return []
  }

  const maxIndexes = scores
    .map((score: number, index: number) => (score === maxScore ? index : -1))
    .filter((index: number) => index >= 0)
  return maxIndexes.map((index: number) => dumps[index])
}

function toSearchResultItem(dump: Dump): SearchResultItem {
  return {
    primary: dump.summary,
    secondary: dump.timestamp.toLocaleString(),
  }
}

export function App() {
  const [state, setState]: [SearchState, SetSearchState] = useState({ filter: '' })
  const items = useAppSelector((globalState) => {
    const scores = globalState.dumps.map((dump: Dump) => scoreDump(dump, state.filter))
    return filterDumps(globalState.dumps, scores).map(toSearchResultItem)
  })

  const updateFilter = (text: string) => {
    setState({ filter: text })
  }

  return (
    <Container maxWidth="sm">
      <h1>Braindump</h1>
      <SearchBar onSearch={updateFilter} />
      {items.length > 0 ? <SearchResultList items={items} /> : null}
    </Container>
  )
}
