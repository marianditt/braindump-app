import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Dump } from '../store/dumps'
import React from 'react'
import { Edit as EditIcon } from '@material-ui/icons'
import { parseMarkdown } from './markdown-component'

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
  const formattedDescription = parseMarkdown(props.dump.description)
  return (
    <div className={props.className}>
      <h2>{props.dump.summary}</h2>
      {formattedDescription}
      <div>
        <Button onClick={props.onEdit} variant="contained" color="primary" size="large" startIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
    </div>
  )
}
