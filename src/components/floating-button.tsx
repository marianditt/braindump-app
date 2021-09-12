import { Fab, Theme, withTheme } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import { Link } from 'react-router-dom'

export const FloatingButton = withTheme(styled(FloatingButtonComponent)`
  position: fixed;
  top: auto;
  bottom: ${(props: FloatingButtonProps & ThemeProps<Theme>) => 30 + (props.index || 0) * 70}px;
  left: auto;
  right: 30px;
`)

export interface FloatingButtonProps {
  className: string
  index?: number
  linkTo: string
}

function FloatingButtonComponent(props: FloatingButtonProps) {
  return (
    <Fab className={props.className} color="primary" aria-label="add" component={Link} to={props.linkTo}>
      <Add />
    </Fab>
  )
}
