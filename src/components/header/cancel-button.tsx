import { Close as CancelIcon } from '@material-ui/icons'
import { IconButton, Theme, withTheme } from '@material-ui/core'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'

export const CancelButton = withTheme(styled(CancelButtonComponent)`
  button {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }
`)

interface BackButtonProps {
  className: string
  onCancel: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
}

function CancelButtonComponent(props: BackButtonProps) {
  return (
    <div className={props.className}>
      <IconButton onClick={props.onCancel} edge="start" color="inherit" aria-label="cancel">
        <CancelIcon />
      </IconButton>
    </div>
  )
}

CancelButtonComponent.propTypes = propTypes
