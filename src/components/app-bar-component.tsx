import {
  AppBar as ReactAppBar,
  IconButton,
  Menu,
  MenuItem,
  Theme,
  Toolbar,
  Typography,
  withTheme,
} from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import { Menu as MenuIcon } from '@material-ui/icons'
import React, { MouseEvent, useState } from 'react'

export const AppBar = withTheme(styled(Component)`
  flex-grow: 1;

  & > div > button:first-child {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }

  & > div > h6 {
    flex-grow: 1;
  }
`)

interface AppBarProps {
  className: string
  title: string
  actions: MenuAction[]
}

export interface MenuAction {
  title: string
  action: () => void
}

function Component(props: AppBarProps) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  const onMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget)
  }

  const onMenuClose = () => {
    setAnchor(null)
  }

  const onAction = (action: () => void) => {
    action()
    onMenuClose()
  }

  const menuItems = props.actions.map((menuAction: MenuAction, index: number) => (
    <MenuItem key={`menu-item-${index}`} onClick={() => onAction(menuAction.action)}>
      {menuAction.title}
    </MenuItem>
  ))

  return (
    <ReactAppBar className={props.className} position="static">
      <Toolbar>
        <IconButton onClick={onMenuOpen} edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>

        <Menu id="app-menu" anchorEl={anchor} keepMounted open={!!anchor} onClose={onMenuClose}>
          {menuItems}
        </Menu>

        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </ReactAppBar>
  )
}
