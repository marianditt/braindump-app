import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Dump } from '../store/dumps'
import React, { useEffect } from 'react'
import { Edit as EditIcon } from '@material-ui/icons'
import { MarkdownParserOptions, parseMarkdown } from './markdown-component'
import { EventHandlerBuilder } from './key-event-handler'

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
  const mdOptions: MarkdownParserOptions = {
    headingOffset: 2,
  }
  const formattedDescription = parseMarkdown(props.dump.description, mdOptions)

  const eventHandler = new EventHandlerBuilder().onEdit(props.onEdit).build()

  const onKeyDown = (event: KeyboardEvent) => {
    eventHandler(event)
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  })

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
