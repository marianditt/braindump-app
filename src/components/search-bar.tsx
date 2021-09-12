import { FormControl, Input, InputAdornment, InputLabel, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Search } from '@material-ui/icons'
import React from 'react'

export const SearchBar = withTheme(styled(SearchBarComponent)`
  margin: ${(props) => props.theme.spacing(1, 0, 1, 0)};
`)

export interface SearchBarProps {
  className: string
  onSearch: (text: string) => void
}

function SearchBarComponent(props: SearchBarProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onSearch(event.target.value)
  }

  return (
    <FormControl className={props.className}>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input
        id="search"
        onChange={onChange}
        endAdornment={
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
  )
}
