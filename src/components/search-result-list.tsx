import { List, ListItemText, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'

export const SearchResultList = withTheme(styled(Component)`
  width: 100%;
  max-width: 360px;
  background-color: ${(props) => props.theme.palette.background.paper};
`)

export interface SearchResultItem {
  primary: string
  secondary: string
}

export interface SearchResultListProps {
  className: string
  items: SearchResultItem[]
}

function Component(props: SearchResultListProps) {
  const items = props.items.map((item: SearchResultItem) => (
    <ListItemText primary={item.primary} secondary={item.secondary} />
  ))
  return <List className={props.className}>{items}</List>
}
