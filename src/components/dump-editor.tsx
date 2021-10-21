import { TextField, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { isEmpty } from '../validators/string-validators'
import { Dump, dumpShape } from '../types/dump-types'
import PropTypes from 'prop-types'
import { createDump } from '../services/create-service'

export const DumpEditor = withTheme(styled(DumpEditorComponent)`
  div {
    width: 100%;
  }

  > div {
    margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(2, 0, 2)};
  }

  > div > div > div > TextArea {
    font-family: monospace;
  }
`)

interface DumpEditorProps {
  className: string
  dump?: Dump
  onChange: (dump: Dump) => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  dump: PropTypes.shape(dumpShape),
  onChange: PropTypes.func.isRequired,
}

interface DumpFieldState {
  value: string | null
  hasError: boolean
  error: string | null
}

interface EditorState {
  summary: DumpFieldState
  description: DumpFieldState
}

type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>

function DumpEditorComponent(props: DumpEditorProps) {
  const { dump, onChange } = props

  const initialState: EditorState = {
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

  const [state, setState]: [EditorState, SetEditorState] = useState(initialState)

  useEffect(() => {
    const id = dump?.id || null
    const summary = state.summary.value || ''
    const description = state.description.value || ''
    onChange(createDump(id, summary, description))
  }, [state, dump?.id, onChange])

  function onFieldChange(field: keyof EditorState, value: string): void {
    const hasError = isEmpty(value)
    const error = hasError ? 'Field must not be empty' : null
    setState((prevState: EditorState) => ({
      ...prevState,
      [field]: { value, hasError, error },
    }))
  }

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
  }

  return (
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
          onChange={(event: ChangeEvent<HTMLInputElement>) => onFieldChange('description', event.target.value)}
          error={state.description.hasError}
          helperText={state.description.error}
        />
      </div>
    </form>
  )
}

DumpEditorComponent.propTypes = propTypes
