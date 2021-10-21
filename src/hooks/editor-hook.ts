import { Dump } from '../types/dump-types'
import { useCallback, useEffect, useState } from 'react'
import { isEmpty } from '../validators/string-validators'
import { useDumpByIdSelector } from './dump-selector-hooks'

export interface EditorState {
  selectedDump: Dump | null
  changedDump: Dump | null
  saveDisabled: boolean
}

export type EditorAction = (dump: Dump) => void

export function useEditorState(dumpId?: string): [EditorState, EditorAction] {
  const selectedDump: Dump | null = useDumpByIdSelector(dumpId)

  const [state, setState] = useState<EditorState>({
    selectedDump,
    changedDump: selectedDump,
    saveDisabled: true,
  })

  useEffect(() => {
    setState({ selectedDump, changedDump: selectedDump, saveDisabled: true })
  }, [selectedDump])

  const onChange = useCallback((dump: Dump): void => {
    setState((prevState: EditorState) => ({
      ...prevState,
      changedDump: dump,
      saveDisabled: !validate(prevState.selectedDump, dump),
    }))
  }, [])

  function validate(oldDump: Dump | null, newDump: Dump): boolean {
    const validSummary = !isEmpty(newDump.summary)
    const validDescription = !isEmpty(newDump.description)
    const summaryChanged = newDump.summary.trim() !== oldDump?.summary
    const descriptionChanged = newDump.description !== oldDump?.description
    return validSummary && validDescription && (summaryChanged || descriptionChanged)
  }

  return [state, onChange]
}
