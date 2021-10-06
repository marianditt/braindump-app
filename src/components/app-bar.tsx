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
import PropTypes from 'prop-types'
import { MenuAction, menuActionShape } from '../types/menu-action-types'

export const AppBar = withTheme(styled(AppBarComponent)`
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

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape(menuActionShape).isRequired).isRequired,
}

function AppBarComponent(props: AppBarProps): JSX.Element {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

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

        {menuItems.length > 0 ? (
          <Menu id="app-menu" anchorEl={anchor} keepMounted open={!!anchor} onClose={onMenuClose}>
            {menuItems}
          </Menu>
        ) : null}

        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </ReactAppBar>
  )
}

AppBarComponent.propTypes = propTypes
