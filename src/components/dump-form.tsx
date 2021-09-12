import { Button, TextField, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import React, { ChangeEvent, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Dump } from '../store/dumps'
import { isEmpty } from '../validators/string-validators'
import { createDump } from '../services/create-service'
import { Save } from '@material-ui/icons'

export const DumpForm = withTheme(styled(DumpFormComponent)`
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

export interface DumpFormProps {
  className: string
  onSave: (dump: Dump) => void
  linkTo: string
}

interface TextFieldState {
  value: string | null
  hasError: boolean
  error: string | null
}

interface DumpFormState {
  summary: TextFieldState
  description: TextFieldState
  done: boolean
}

type SetDumpFormState = React.Dispatch<React.SetStateAction<DumpFormState>>

function DumpFormComponent(props: DumpFormProps) {
  const initialState: DumpFormState = {
    summary: {
      value: null,
      hasError: false,
      error: null,
    },
    description: {
      value: null,
      hasError: false,
      error: null,
    },
    done: false,
  }

  const [state, setState]: [DumpFormState, SetDumpFormState] = useState(initialState)

  const onSummaryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const hasError = isEmpty(value)
    const error = hasError ? 'Summary must not be empty' : null
    setState((prevState: DumpFormState) => ({
      ...prevState,
      summary: { value, hasError, error },
    }))
  }

  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const hasError = isEmpty(event.target.value)
    const error = hasError ? 'Description must not be empty' : null
    setState((prevState: DumpFormState) => ({
      ...prevState,
      description: { value, hasError, error },
    }))
  }

  const isValidDump = () => {
    const validSummary = state.summary.value !== null && !state.summary.hasError
    const validDescription = state.description !== null && !state.description.hasError
    return validSummary && validDescription
  }

  const onSave = () => {
    const summary = state.summary.value || ''
    const description = state.description.value || ''

    if (isValidDump()) {
      const dump = createDump(summary, description)
      props.onSave(dump)
      setState((previousState: DumpFormState) => ({ ...previousState, done: true }))
    }
  }

  return (
    <form className={props.className} noValidate autoComplete="off">
      <div>
        <TextField
          id="summary"
          label="Summary"
          variant="outlined"
          onChange={onSummaryChange}
          error={state.summary.hasError}
          helperText={state.summary.error}
        />
      </div>
      <div>
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          multiline
          rows={12}
          onChange={onDescriptionChange}
          error={state.description.hasError}
          helperText={state.description.error}
        />
      </div>
      <div>
        <Button
          disabled={!isValidDump()}
          onClick={onSave}
          variant="contained"
          color="primary"
          size="large"
          startIcon={<Save />}
        >
          Save
        </Button>
      </div>
      {state.done ? <Redirect to={props.linkTo} /> : null}
    </form>
  )
}
