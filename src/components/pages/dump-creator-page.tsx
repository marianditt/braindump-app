import { Navigation, useNavigation } from '../../hooks/navigation-hook'
import { Dump } from '../../types/dump-types'
import { addDump } from '../../store/dump-store'
import React from 'react'
import { EditorBase } from './editor-base-page'
import PropTypes from 'prop-types'
import { useAppDispatch } from '../../store/store'

interface DumpCreatorPageProps {
  useNavigation: () => Navigation
  useDispatch: () => any
}

const propTypes = {
  useNavigation: PropTypes.func.isRequired,
}

export function DumpCreatorPage(props: DumpCreatorPageProps) {
  const navigation = props.useNavigation()
  const dispatch = props.useDispatch()

  function onSave(dump: Dump): void {
    dispatch(addDump(dump))
    navigation.navigateToEdit(dump)
  }

  return <EditorBase title="Create new dump" onSave={onSave} />
}

DumpCreatorPage.propTypes = propTypes

DumpCreatorPage.defaultProps = {
  useNavigation,
  useDispatch: useAppDispatch,
}
