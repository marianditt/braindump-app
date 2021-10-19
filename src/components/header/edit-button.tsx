import { IconButton, Theme, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import PropTypes from 'prop-types'
import { Edit as EditIcon } from '@material-ui/icons'
import React from 'react'

export const EditButton = withTheme(styled(EditButtonComponent)`
  button {
    margin-right: ${(props: ThemeProps<Theme>) => props.theme.spacing(2)};
  }
`)

interface EditButtonProps {
  className: string
  onEdit: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
}

function EditButtonComponent(props: EditButtonProps) {
  return (
    <div className={props.className}>
      <IconButton onClick={props.onEdit} edge="end" color="inherit" aria-label="edit">
        <EditIcon />
      </IconButton>
    </div>
  )
}

EditButtonComponent.propTypes = propTypes
