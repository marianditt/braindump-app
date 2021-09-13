import { Button, TextField, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Dump } from '../store/dumps'
import { isEmpty } from '../validators/string-validators'
import { createDump } from '../services/create-service'
import { Save as SaveIcon } from '@material-ui/icons'

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
`)

interface EditDumpProps {
  className: string
  dump?: Dump
  onSave: (dump: Dump) => void
}

interface DumpFieldState {
  value: string | null
  hasError: boolean
  error: string | null
}

interface DumpState {
  summary: DumpFieldState
  description: DumpFieldState
}

type SetDumpState = React.Dispatch<React.SetStateAction<DumpState>>

function Component(props: EditDumpProps) {
  const initialState: DumpState = {
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
  const [validated, setValidated]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState(false as boolean)

  const onFieldChange = (field: keyof DumpState, value: string) => {
    const hasError = isEmpty(value)
    const error = hasError ? 'Field must not be empty' : null
    setState((prevState) => ({ ...prevState, [field]: { value, hasError, error } }))
  }

  const onSave = () => {
    const id = props.dump?.id || null
    const summary = state.summary.value || ''
    const description = state.description.value || ''

    if (validated) {
      const dump = createDump(id, summary, description)
      props.onSave(dump)
    }
  }

  useEffect(() => {
    const validSummary = state.summary.value !== null && !state.summary.hasError
    const validDescription = state.description.value !== null && !state.description.hasError
    setValidated(validSummary && validDescription)
  }, [state])

  return (
    <>
      <form className={props.className} noValidate autoComplete="off">
        <div>
          <TextField
            id="summary"
            label="Summary"
            variant="outlined"
            value={state.summary.value || ''}
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
            disabled={!validated}
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
