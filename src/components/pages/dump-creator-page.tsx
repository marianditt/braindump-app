import { DumpEditor } from '../dump-editor'
import { addDump } from '../../store/dump-store'
import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '@material-ui/core'
import { AppBar } from '../header/app-bar'
import { CancelButton } from '../header/cancel-button'
import { Navigation, useNavigation } from '../../hooks/navigation-hook'
import { useCancelShortcut, useSaveShortcut } from '../../hooks/shortcut-hooks'
import { EditorAction, EditorState, useEditorState } from '../../hooks/editor-hook'
import { SaveButton } from '../header/save-button'
import { useDispatch } from 'react-redux'

interface DumpCreatorPageProps {
  useNavigation: () => Navigation
  useEditorState: (dumpId?: string) => [EditorState, EditorAction]
  useDispatch: () => any
}

const propTypes = {
  useNavigation: PropTypes.func.isRequired,
  useEditorState: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
}

export function DumpCreatorPage(props: DumpCreatorPageProps) {
  const navigation = props.useNavigation()
  const [editorState, onDumpChange] = props.useEditorState()
  const dispatch = props.useDispatch()

  useCancelShortcut(navigation.navigateHome)
  useSaveShortcut(onSave)

  function onSave(): void {
    if (!editorState.saveDisabled && editorState.changedDump !== null) {
      dispatch(addDump(editorState.changedDump))
      navigation.navigateToEdit(editorState.changedDump)
    }
  }

  return (
    <>
      <AppBar
        title="Braindump"
        primaryButton={<CancelButton onCancel={navigation.navigateHome} />}
        secondaryButton={<SaveButton disabled={editorState.saveDisabled} onSave={onSave} />}
      />

      <Container maxWidth={false}>
        <h1>Create new dump</h1>
        <DumpEditor dump={editorState.selectedDump} onChange={onDumpChange} />
      </Container>
    </>
  )
}

DumpCreatorPage.propTypes = propTypes

DumpCreatorPage.defaultProps = {
  useNavigation,
  useEditorState,
  useDispatch: () => useDispatch<any>(),
}
