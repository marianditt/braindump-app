import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core'
import PropTypes from 'prop-types'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useCancelShortcut } from '../hooks/shortcut-hooks'
import { ActionButton } from './header/action-button'

interface DumpSearchFilterProps {
  onChange: (filter: string) => void
}

const propTypes = {
  onChange: PropTypes.func.isRequired,
}

export function DumpSearchFilter(props: DumpSearchFilterProps): JSX.Element {
  const [state, setState]: [string, React.Dispatch<string>] = useState('')
  const inputRef = useRef<HTMLInputElement>()

  useCancelShortcut(() => onChange(''))

  function onChange(filter: string): void {
    props.onChange(filter)
    setState(filter)
    inputRef.current?.focus()
  }

  return (
    <FormControl>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        id="search"
        inputRef={inputRef}
        value={state}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <ActionButton action={state === '' ? 'search' : 'cancel'} onClick={() => onChange('')} edge={'end'} />
          </InputAdornment>
        }
        autoFocus
        autoComplete="off"
      />
    </FormControl>
  )
}

DumpSearchFilter.propTypes = propTypes
