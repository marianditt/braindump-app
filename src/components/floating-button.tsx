import { Fab, Theme, withTheme } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'

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
  onClick: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  index: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}

function FloatingButtonComponent(props: FloatingButtonProps): JSX.Element {
  return (
    <Fab className={props.className} color="primary" aria-label="add" onClick={props.onClick}>
      <AddIcon />
    </Fab>
  )
}

FloatingButtonComponent.propTypes = propTypes

FloatingButtonComponent.defaultProps = {
  onClick: () => {},
}
