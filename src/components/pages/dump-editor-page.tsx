import { DumpEditor } from '../dump-editor'
import { useParams } from 'react-router-dom'
import { updateDump } from '../../store/dump-store'
import { useDispatch } from 'react-redux'
import { FloatingButton } from '../floating-button'
import React from 'react'
import { Container } from '@material-ui/core'
import { AppBar } from '../header/app-bar'
import PropTypes from 'prop-types'
import { DumpRouteParam, Navigation, useNavigation } from '../../hooks/navigation-hook'
import { useCancelShortcut, useSaveShortcut } from '../../hooks/shortcut-hooks'
import { EditorAction, EditorState, useEditorState } from '../../hooks/editor-hook'
import { ActionButton } from '../header/action-button'
import { DumpDetails } from '../dump-details'

interface DumpEditorPageProps {
  useDumpParam: () => DumpRouteParam
  useNavigation: () => Navigation
  useEditorState: (dumpId: string) => [EditorState, EditorAction]
  useDispatch: () => any
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
  useEditorState: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
}

export function DumpEditorPage(props: DumpEditorPageProps) {
  const routeParams = props.useDumpParam()
  const navigation = props.useNavigation()
  const [editorState, onDumpChange] = props.useEditorState(routeParams.dumpId)
  const dispatch = props.useDispatch()

  useCancelShortcut(navigation.navigateHome)
  useSaveShortcut(onSave)

  function onSave(): void {
    if (!editorState.saveDisabled && editorState.changedDump !== null) {
      dispatch(updateDump(editorState.changedDump))
    }
  }

  return (
    <>
      <AppBar
        title="Braindump"
        primaryButton={<ActionButton action="cancel" onClick={navigation.navigateHome} edge="start" />}
        secondaryButton={<ActionButton action="save" disabled={editorState.saveDisabled} onClick={onSave} edge="end" />}
      />

      <Container maxWidth={false}>
        <h1>Edit dump</h1>
        <DumpEditor dump={editorState.selectedDump} onChange={onDumpChange} />
        {editorState.changedDump !== null && <DumpDetails dump={editorState.changedDump} />}
        <FloatingButton onClick={navigation.navigateToCreate} />
      </Container>
    </>
  )
}

DumpEditorPage.propTypes = propTypes

DumpEditorPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useNavigation,
  useEditorState,
  useDispatch: () => useDispatch<any>(),
}
