import { Button, TextField, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { isEmpty } from '../validators/string-validators'
import { createDump } from '../services/create-service'
import { Save as SaveIcon } from '@material-ui/icons'
import { EventHandlerBuilder } from './key-event-handler'
import { Dump } from '../types/dump-types'

export const EditDumpComponent = withTheme(styled(Component)`
  div {
    width: 100%;
  }

  > div {
    margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(2, 0, 2)};
  }

  > div:last-child {
    text-align: right;
  }

  > div > div > div > TextArea {
    font-family: monospace;
  }
`)

interface EditDumpProps {
  className: string
  dump?: Dump
  onSave: (dump: Dump) => void
  onCancel: () => void
}

interface DumpFieldState {
  value: string | null
  hasError: boolean
  error: string | null
}

interface DumpState {
  currentDump: Dump | null
  summary: DumpFieldState
  description: DumpFieldState
}

type SetDumpState = React.Dispatch<React.SetStateAction<DumpState>>

function Component(props: EditDumpProps) {
  const initialState: DumpState = {
    currentDump: props.dump || null,
    summary: {
      value: props.dump?.summary || null,
      hasError: false,
      error: null,
    },
    description: {
      value: props.dump?.description || null,
      hasError: false,
      error: null,
    },
  }

  const [state, setState]: [DumpState, SetDumpState] = useState(initialState)
  const [saveEnabled, setSaveEnabled]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(
    false as boolean
  )

  const onFieldChange = (field: keyof DumpState, value: string) => {
    const hasError = isEmpty(value)
    const error = hasError ? 'Field must not be empty' : null
    setState((prevState: DumpState) => ({
      ...prevState,
      [field]: { value, hasError, error },
    }))
  }

  const onSave = () => {
    const id = state.currentDump?.id || null
    const summary = state.summary?.value || ''
    const description = state.description?.value || ''

    if (saveEnabled) {
      const dump = createDump(id, summary, description)
      props.onSave(dump)
      setState((prevState: DumpState) => ({
        ...prevState,
        summary: { ...prevState.summary, value: dump.summary },
        description: { ...prevState.description, value: dump.description },
        currentDump: dump,
      }))
    }
  }

  const onCancel = () => {
    props.onCancel()
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const eventHandler = new EventHandlerBuilder().onSave(onSave).onCancel(onCancel).build()

  const onKeyDown = (event: KeyboardEvent) => {
    eventHandler(event)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  useEffect(() => {
    const validSummary = state.summary.value !== null && !state.summary.hasError
    const validDescription = state.description.value !== null && !state.description.hasError
    const summaryChanged = state.summary.value?.trim() !== state.currentDump?.summary
    const descriptionChanged = state.description.value !== state.currentDump?.description
    setSaveEnabled(validSummary && validDescription && (summaryChanged || descriptionChanged))
  }, [state])

  return (
    <>
      <form className={props.className} noValidate autoComplete="off" onSubmit={onSubmit}>
        <div>
          <TextField
            id="summary"
            label="Summary"
            variant="outlined"
            value={state.summary.value || ''}
            autoFocus
            onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('summary', event.target.value)}
            error={state.summary.hasError}
            helperText={state.summary.error}
          />
        </div>
        <div>
          <TextField
            id="description"
            label="Description"
            variant="outlined"
            value={state.description.value || ''}
            multiline
            rows={12}
            onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('description', event.target.value)}
            error={state.description.hasError}
            helperText={state.description.error}
          />
        </div>
        <div>
          <Button
            disabled={!saveEnabled}
            onClick={onSave}
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  )
}
