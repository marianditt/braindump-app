import { IconButton, Menu, MenuItem, Theme, withTheme } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import React, { MouseEvent, useState } from 'react'
import { MenuAction, menuActionShape } from '../../types/menu-action-types'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'

export const MenuButton = withTheme(styled(MenuButtonComponent)`
  button {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }
`)

interface MenuButtonProps {
  className: string
  actions: MenuAction[]
}

const propTypes = {
  className: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape(menuActionShape).isRequired).isRequired,
}

function MenuButtonComponent(props: MenuButtonProps): JSX.Element {
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
    <div className={props.className}>
      <IconButton onClick={onMenuOpen} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      {menuItems.length > 0 && (
        <Menu id="app-menu" anchorEl={anchor} keepMounted open={!!anchor} onClose={onMenuClose}>
          {menuItems}
        </Menu>
      )}
    </div>
  )
}

MenuButtonComponent.propTypes = propTypes
