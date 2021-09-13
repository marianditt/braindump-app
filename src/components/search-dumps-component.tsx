import {
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  withTheme,
} from '@material-ui/core'
import React, { ChangeEvent } from 'react'
import { Dump } from '../store/dumps'
import styled from 'styled-components'
import { Search as SearchIcon } from '@material-ui/icons'

export const SearchDumpsComponent = withTheme(styled(Component)``)

interface SearchProps {
  dumps: Dump[]
  onSearchFilterChange: (filter: string) => void
  onDumpSelection: (dump: Dump) => void
}

function Component(props: SearchProps) {
  const onSearchFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onSearchFilterChange(event.target.value)
  }

  const adornment = (
    <InputAdornment position="end">
      <SearchIcon />
    </InputAdornment>
  )

  const searchForm = (
    <FormControl>
      <InputLabel htmlFor="search">Search</InputLabel>
      <Input id="search" onChange={onSearchFilterChange} endAdornment={adornment} autoComplete="off" />
    </FormControl>
  )

  const listItems = props.dumps.map((dump: Dump) => (
    <ListItem key={dump.id} button onClick={() => props.onDumpSelection(dump)}>
      <ListItemText primary={dump.summary} secondary={new Date(dump.timestamp).toLocaleString()} />
    </ListItem>
  ))

  return (
    <>
      {searchForm}
      {props.dumps.length > 0 ? <List>{listItems}</List> : null}
    </>
  )
}
