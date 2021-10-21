import { FormControl, Input, InputAdornment, InputLabel } from '@material-ui/core'
import React, { ChangeEvent, useState } from 'react'
import PropTypes from 'prop-types'
import { Search as SearchIcon } from '@material-ui/icons'
import { ActionButton } from './header/action-button'

interface DumpSearchFilterProps {
  onChange: (filter: string) => void
}

const propTypes = {
  onChange: PropTypes.func.isRequired,
}

export function DumpSearchFilter(props: DumpSearchFilterProps): JSX.Element {
  const [state, setState]: [string, React.Dispatch<string>] = useState('')

  function onChange(filter: string): void {
    props.onChange(filter)
    setState(filter)
  }

  function selectAction(): JSX.Element {
    if (state === '') {
      return <SearchIcon />
    } else {
      return <ActionButton action={'cancel'} onClick={() => onChange('')} edge={'end'} />
    }
  }

  return (
    <FormControl>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        id="search"
        value={state}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        endAdornment={<InputAdornment position="end">{selectAction()}</InputAdornment>}
        autoFocus
        autoComplete="off"
      />
    </FormControl>
  )
}

DumpSearchFilter.propTypes = propTypes
