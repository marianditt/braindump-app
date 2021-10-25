import { TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import { InputEnhancer, InputState } from './advanced-input-types'
import { closeParentheses, openParentheses, removeParentheses } from './parentheses-enhancer'

interface AdvancedInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error: string | null
  multiline: boolean
  enhancers: InputEnhancer[]
}

const propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  multiline: PropTypes.bool.isRequired,
  enhancers: PropTypes.arrayOf(PropTypes.func.isRequired).isRequired,
}

export function AdvancedInput(props: AdvancedInputProps): JSX.Element {
  const ref = useRef<HTMLInputElement>()
  const [state, setState]: [InputState, React.Dispatch<React.SetStateAction<InputState>>] = useState(
    unpack({ value: props.value })
  )

  useEffect(() => {
    ref.current?.setSelectionRange(state.start, state.end, state.direction)
  }, [state])

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
    const oldState = unpack(event.target)
    const newState = props.enhancers.reduce(
      (prevState: InputState | null, matcher: InputEnhancer) => prevState || matcher(event.key, oldState),
      null
    )

    if (newState !== null) {
      onChange(newState)
      event.stopPropagation()
      event.preventDefault()
    }
  }

  function onChange(newState: InputState): void {
    setState(newState)
    props.onChange(newState.value)
  }

  return (
    <TextField
      inputRef={ref}
      label={props.label}
      value={state.value}
      onKeyDown={onKeyDown}
      onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(unpack(event.target))}
      error={!!props.error}
      helperText={props.error || ''}
      variant="outlined"
      multiline={props.multiline}
    />
  )
}

function unpack({ value, selectionStart, selectionEnd, selectionDirection }: any): InputState {
  return {
    value: value || '',
    start: selectionStart || 0,
    end: selectionEnd || 0,
    direction: selectionDirection || 'none',
  }
}

AdvancedInput.propTypes = propTypes

AdvancedInput.defaultProps = {
  label: '',
  value: '',
  onChange: () => {},
  error: null,
  multiline: false,
  enhancers: [removeParentheses, closeParentheses, openParentheses],
}
