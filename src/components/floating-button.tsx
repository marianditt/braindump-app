import { Fab, Theme, withTheme } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'

export const FloatingButton = withTheme(styled(FloatingButtonComponent)`
  position: fixed;
  top: auto;
  bottom: ${(props: FloatingButtonProps & ThemeProps<Theme>) => 30 + (props.index || 0) * 70}px;
  left: auto;
  right: 30px;
`)

interface FloatingButtonProps {
  className: string
  index?: number
  onClick?: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func,
}

function FloatingButtonComponent(props: FloatingButtonProps) {
  const onClick = props.onClick || (() => undefined)

  return (
    <Fab className={props.className} color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  )
}

FloatingButtonComponent.propTypes = propTypes
