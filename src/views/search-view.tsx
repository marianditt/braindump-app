import React, { useState } from 'react'
import { RootState, useAppSelector } from '../store/store'
import { Dump } from '../store/dumps'
import { createSearchHash, scoreSearchResult } from '../services/search-service'
import { SearchComponent } from '../components/search-component'
import { useHistory } from 'react-router-dom'

interface SearchState {
  filter: string
  selected: Dump | null
}

type SetSearchState = React.Dispatch<React.SetStateAction<SearchState>>

export function SearchView() {
  const initialState: SearchState = {
    filter: '',
    selected: null,
  }

  const [state, setState]: [SearchState, SetSearchState] = useState(initialState)

  const history = useHistory<string>()

  const dumps = useAppSelector((globalState: RootState): Dump[] => {
    const scores = globalState.dumps.map((dump: Dump) => scoreDump(dump, state.filter))
    return filterDumps(globalState.dumps, scores)
  })

  const onSearchFilterChange = (filter: string) => {
    setState((prevState) => ({ ...prevState, filter }))
  }

  const onDumpSelection = (dump: Dump) => {
    history.push(`/dumps/${dump.id}`)
  }

  return (
    <>
      <h2>Find dumps</h2>
      <SearchComponent dumps={dumps} onSearchFilterChange={onSearchFilterChange} onDumpSelection={onDumpSelection} />
    </>
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
