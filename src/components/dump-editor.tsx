import { Theme, withTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { FormEvent, useEffect, useState } from 'react'
import styled, { ThemeProps } from 'styled-components'
import { createDump } from '../services/create-service'
import { Dump, dumpShape } from '../types/dump-types'
import { isEmpty } from '../validators/string-validators'
import { AdvancedInput } from './input/advanced-input'

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
  error: string | null
}

interface EditorState {
  summary: DumpFieldState
  description: DumpFieldState
}

type SetEditorState = React.Dispatch<React.SetStateAction<EditorState>>

function DumpEditorComponent(props: DumpEditorProps): JSX.Element {
  const { dump, onChange } = props

  const initialState: EditorState = {
    summary: {
      value: props.dump?.summary || null,
      error: null,
    },
    description: {
      value: props.dump?.description || null,
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
        <AdvancedInput
          label="Summary"
          value={state.summary.value || ''}
          onChange={(value: string) => onFieldChange('summary', value)}
          error={state.summary.error}
        />
      </div>
      <div>
        <AdvancedInput
          label="Description"
          value={state.description.value || ''}
          onChange={(value: string) => onFieldChange('description', value)}
          error={state.description.error}
          multiline
        />
      </div>
    </form>
  )
}

DumpEditorComponent.propTypes = propTypes
