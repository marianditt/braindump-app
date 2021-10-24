import React, { ChangeEvent, useRef, useState } from 'react'
import { RootState, store, useAppSelector } from '../../store/store'
import { removeDump, setDumps } from '../../store/dump-store'
import { createSearchHash, scoreSearchResult } from '../../services/search-service'
import { DumpSearchFilter } from '../dump-search-filter'
import { DumpSearchResults } from '../dump-search-results'
import { useDispatch } from 'react-redux'
import { Dump } from '../../types/dump-types'
import { AppBar } from '../header/app-bar'
import { MenuButton } from '../header/menu-button'
import { exportState, importState } from '../../services/import-export-service'
import { MenuAction } from '../../types/menu-action-types'
import { FloatingButton } from '../floating-button'
import { Navigation, useNavigation } from '../../hooks/navigation-hook'
import PropTypes from 'prop-types'
import { PageContent } from './page-content'

interface DumpSearchPageProps {
  useNavigation: () => Navigation
}

const propTypes = {
  useNavigation: PropTypes.func.isRequired,
}

interface SearchState {
  filter: string
  selected: Dump | null
}

type SetSearchState = React.Dispatch<React.SetStateAction<SearchState>>

export function DumpSearchPage(props: DumpSearchPageProps) {
  const navigation = props.useNavigation()

  const initialState: SearchState = {
    filter: '',
    selected: null,
  }

  const [state, setState]: [SearchState, SetSearchState] = useState(initialState)

  const dumps = useAppSelector((globalState: RootState): Dump[] => {
    const scores = globalState.dumps.map((dump: Dump) => scoreDump(dump, state.filter))
    return filterDumps(globalState.dumps, scores)
  })

  const dispatch = useDispatch<any>()

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

  const onSearchFilterChange = (filter: string) => {
    setState((prevState) => ({ ...prevState, filter }))
  }

  const onDumpRemoval = (dump: Dump) => {
    dispatch(removeDump(dump))
  }

  return (
    <>
      <AppBar title="Braindump" primaryButton={<MenuButton actions={menuActions} />} />

      <input
        type="file"
        ref={inputFile}
        accept={'application/json, .json'}
        onChange={onFileChoice}
        style={{ display: 'none' }}
      />

      <PageContent title="Find dumps">
        <DumpSearchFilter onChange={onSearchFilterChange} />
        {dumps.length > 0 && (
          <DumpSearchResults
            dumps={dumps}
            onDumpSelection={navigation.navigateToDetails}
            onDumpRemoval={onDumpRemoval}
          />
        )}
        <FloatingButton onClick={navigation.navigateToCreate} />
      </PageContent>
    </>
  )
}

DumpSearchPage.propTypes = propTypes

DumpSearchPage.defaultProps = {
  useNavigation,
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
