import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { MouseEvent, useState } from 'react'
import { MenuAction, menuActionShape } from '../../types/menu-action-types'

interface MenuButtonProps {
  actions: MenuAction[]
}

const propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape(menuActionShape).isRequired).isRequired,
}

export function MenuButton(props: MenuButtonProps): JSX.Element {
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
    <>
      <IconButton onClick={onMenuOpen} edge="start" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>

      {menuItems.length > 0 && (
        <Menu id="app-menu" anchorEl={anchor} keepMounted open={!!anchor} onClose={onMenuClose}>
          {menuItems}
        </Menu>
      )}
    </>
  )
}

MenuButton.propTypes = propTypes
