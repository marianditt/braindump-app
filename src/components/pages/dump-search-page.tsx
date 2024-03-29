import PropTypes from 'prop-types'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useDumpByFilterSelector } from '../../hooks/dump-selector-hooks'
import { Navigation, useNavigation } from '../../hooks/navigation-hook'
import { exportState, importState } from '../../services/import-export-service'
import { mergeDumps, removeDump } from '../../store/dump-store-actions'
import { RootState, store, useAppDispatch } from '../../store/store'
import { Dump } from '../../types/dump-types'
import { MenuAction } from '../../types/menu-action-types'
import { DumpSearchFilter } from '../dump-search-filter'
import { DumpSearchResults } from '../dump-search-results'
import { FloatingButton } from '../floating-button'
import { AppBar } from '../header/app-bar'
import { MenuButton } from '../header/menu-button'
import { PageContent } from './page-content'

interface DumpSearchPageProps {
  useDumpByFilterSelector: (filter: string) => Dump[]
  useNavigation: () => Navigation
  useDispatch: () => any
}

const propTypes = {
  useDumpByFilterSelector: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
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

  const dumps = props.useDumpByFilterSelector(state.filter)

  const dispatch = props.useDispatch()

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
      dispatch(mergeDumps(state.dumps))
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
  useDumpByFilterSelector,
  useNavigation,
  useDispatch: useAppDispatch,
}
