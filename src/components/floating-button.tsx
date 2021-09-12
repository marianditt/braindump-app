import { Fab, Theme, withTheme } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'

export const FloatingButton = withTheme(styled(Component)`
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

function Component(props: FloatingButtonProps) {
  const onClick = props.onClick || (() => undefined)

  return (
    <Fab className={props.className} color="primary" aria-label="add" onClick={onClick}>
      <AddIcon />
    </Fab>
  )
}
