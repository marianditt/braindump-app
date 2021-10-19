import { IconButton, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'
import { Save as SaveIcon } from '@material-ui/icons'
import React from 'react'

export const SaveButton = withTheme(styled(SaveButtonComponent)`
  button {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }
`)

interface SaveButtonProps {
  className: string
  disabled: boolean
  onSave: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
}

function SaveButtonComponent(props: SaveButtonProps): JSX.Element {
  return (
    <div className={props.className}>
      <IconButton onClick={props.onSave} disabled={props.disabled} edge="end" color="inherit" aria-label="save">
        <SaveIcon />
      </IconButton>
    </div>
  )
}

SaveButtonComponent.propTypes = propTypes
