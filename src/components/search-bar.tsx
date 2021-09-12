import { FormControl, Input, InputAdornment, InputLabel, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import { Search } from '@material-ui/icons'
import { ChangeEvent } from 'react'

export const SearchBar = withTheme(styled(SearchBarComponent)`
  margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(1, 0, 1, 0)};
`)

export interface SearchBarProps {
  className: string
  onSearchFilterChange: (filter: string) => void
}

function SearchBarComponent(props: SearchBarProps) {
  const onSearchFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onSearchFilterChange(event.target.value)
  }

  const searchAdornment = (
    <InputAdornment position="end">
      <Search />
    </InputAdornment>
  )

  return (
    <FormControl className={props.className}>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input id="search" onChange={onSearchFilterChange} endAdornment={searchAdornment} />
    </FormControl>
  )
}
