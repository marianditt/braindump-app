import { List, ListItemText, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'

export const SearchResultList = withTheme(styled(SearchResultListComponent)`
  width: 100%;
  max-width: 360px;
  background-color: ${(props: ThemeProps<Theme>) => props.theme.palette.background.paper};
`)

export interface SearchResultItem {
  primary: string
  secondary: string
}

export interface SearchResultListProps {
  className: string
  searchResultItems: SearchResultItem[]
}

function SearchResultListComponent(props: SearchResultListProps) {
  const items = props.searchResultItems.map((item: SearchResultItem) => (
    <ListItemText primary={item.primary} secondary={item.secondary} />
  ))
  return <List className={props.className}>{items}</List>
}
