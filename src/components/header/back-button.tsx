import { ArrowBack as BackIcon } from '@material-ui/icons'
import { IconButton, Theme, withTheme } from '@material-ui/core'
import React from 'react'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'

export const BackButton = withTheme(styled(BackButtonComponent)`
  button {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }
`)

interface BackButtonProps {
  className: string
  onBack: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
}

function BackButtonComponent(props: BackButtonProps) {
  return (
    <div className={props.className}>
      <IconButton onClick={props.onBack} edge="start" color="inherit" aria-label="back">
        <BackIcon />
      </IconButton>
    </div>
  )
}

BackButtonComponent.propTypes = propTypes
