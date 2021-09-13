import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Dump } from '../store/dumps'
import React from 'react'
import { Edit as EditIcon } from '@material-ui/icons'

export const ShowDumpComponent = withTheme(styled(Component)`
  > div:last-child {
    text-align: right;
  }
`)

interface DumpProps {
  className: string
  dump: Dump
  onEdit: () => void
}

function Component(props: DumpProps) {
  return (
    <div className={props.className}>
      <h2>{props.dump.summary}</h2>
      <p>{props.dump.description}</p>
      <div>
        <Button onClick={props.onEdit} variant="contained" color="primary" size="large" startIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
    </div>
  )
}
