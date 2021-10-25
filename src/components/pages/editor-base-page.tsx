import PropTypes from 'prop-types'
import React from 'react'
import { EditorAction, EditorState, useEditorState } from '../../hooks/editor-hook'
import { Navigation, useNavigation } from '../../hooks/navigation-hook'
import { useCancelShortcut, useSaveShortcut } from '../../hooks/shortcut-hooks'
import { Dump, dumpShape } from '../../types/dump-types'
import { DumpDetails } from '../dump-details'
import { DumpEditor } from '../dump-editor'
import { FloatingButton } from '../floating-button'
import { ActionButton } from '../header/action-button'
import { AppBar } from '../header/app-bar'
import { PageContent } from './page-content'

interface EditorBaseProps {
  title: string
  selectedDump?: Dump | null
  onSave: (dump: Dump) => void

  useNavigation: () => Navigation
  useEditorState: (selectedDump: Dump | null) => [EditorState, EditorAction]
}

const propTypes = {
  title: PropTypes.string.isRequired,
  selectedDump: PropTypes.shape(dumpShape),
  onSave: PropTypes.func.isRequired,

  useNavigation: PropTypes.func.isRequired,
  useEditorState: PropTypes.func.isRequired,
}

export function EditorBase(props: EditorBaseProps) {
  const navigation = props.useNavigation()
  const [editorState, onChange] = props.useEditorState(props?.selectedDump || null)

  useCancelShortcut(navigation.navigateHome)
  useSaveShortcut(onSave)

  function onSave(): void {
    if (!editorState.saveDisabled && editorState.changedDump !== null) {
      props.onSave(editorState.changedDump)
    }
  }

  return (
    <>
      <AppBar
        title="Braindump"
        primaryButton={<ActionButton action="cancel" onClick={navigation.navigateHome} edge="start" />}
        secondaryButton={<ActionButton action="save" disabled={editorState.saveDisabled} onClick={onSave} edge="end" />}
      />

      <PageContent title={props.title}>
        <DumpEditor dump={editorState.selectedDump} onChange={onChange} />
        {editorState.changedDump !== null && <DumpDetails dump={editorState.changedDump} />}
        {editorState.selectedDump !== null && <FloatingButton onClick={navigation.navigateToCreate} />}
      </PageContent>
    </>
  )
}

EditorBase.propTypes = propTypes

EditorBase.defaultProps = {
  useNavigation,
  useEditorState,
}
