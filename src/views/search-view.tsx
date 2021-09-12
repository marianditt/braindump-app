import { SearchBar } from '../components/search-bar'
import { SearchResultItem, SearchResultList } from '../components/search-result-list'
import { FloatingButton } from '../components/floating-button'
import { Container } from '@material-ui/core'
import { useState } from 'react'
import { RootState, useAppSelector } from '../store/store'
import { Dump } from '../store/dumps'
import { createSearchHash, scoreSearchResult } from '../services/search-service'

export function SearchView() {
  const [state, setState] = useState({ filter: '' })

  const items = useAppSelector((globalState: RootState) => {
    const scores = globalState.dumps.map((dump: Dump) => scoreDump(dump, state.filter))
    return filterDumps(globalState.dumps, scores).map(toSearchResultItem)
  })

  const onSearchFilterChange = (filter: string) => {
    setState({ filter })
  }

  return (
    <Container maxWidth="sm">
      <h1>Braindump</h1>
      <h2>Find dumps</h2>
      <SearchBar onSearchFilterChange={onSearchFilterChange} />
      {items.length > 0 ? <SearchResultList searchResultItems={items} /> : null}
      <FloatingButton linkTo={'/create'} />
    </Container>
  )
}

function scoreDump(dump: Dump, filter: string): number {
  const searchableDump = createSearchHash(dump.summary, dump.description, ...dump.tags)
  const searchableFilter = createSearchHash(filter)
  return scoreSearchResult(searchableDump, searchableFilter)
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
