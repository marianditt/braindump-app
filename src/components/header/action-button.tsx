import { ArrowBack, Close, Delete, Edit, Save, Search } from '@material-ui/icons'
import { IconButton, withTheme } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const ActionButton = withTheme(styled(ActionButtonComponent)``)

interface ActionButtonProps {
  className: string
  action: 'search' | 'back' | 'cancel' | 'delete' | 'edit' | 'save'
  disabled: boolean
  onClick: () => void
  edge: 'start' | 'end'
}

const propTypes = {
  className: PropTypes.string.isRequired,
  action: PropTypes.oneOf(['search', 'back', 'cancel', 'delete', 'edit', 'save']).isRequired,
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  edge: PropTypes.oneOf(['start', 'end']).isRequired,
}

function ActionButtonComponent(props: ActionButtonProps): JSX.Element {
  function selectIcon(): JSX.Element | null {
    switch (props.action) {
      case 'search':
        return <Search />
      case 'back':
        return <ArrowBack />
      case 'cancel':
        return <Close />
      case 'delete':
        return <Delete />
      case 'edit':
        return <Edit />
      case 'save':
        return <Save />
      default:
        return null
    }
  }

  return (
    <IconButton
      className={props.className}
      disabled={props.disabled}
      onClick={props.onClick}
      edge={props.edge}
      color="inherit"
      aria-label={props.action}
    >
      {selectIcon()}
    </IconButton>
  )
}

ActionButtonComponent.propTypes = propTypes

ActionButtonComponent.defaultProps = {
  disabled: false,
  onClick: () => {},
}
