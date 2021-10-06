import { Button, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Edit as EditIcon } from '@material-ui/icons'
import { EventHandlerBuilder } from './key-event-handler'
import Markdown from 'react-markdown'
import { Dump, dumpShape } from '../types/dump-types'
import PropTypes from 'prop-types'

export const DumpWidget = withTheme(styled(DumpWidgetComponent)`
  > div:last-child {
    text-align: right;
  }
`)

interface DumpProps {
  className: string
  dump: Dump
  onEdit: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  dump: PropTypes.shape(dumpShape).isRequired,
  onEdit: PropTypes.func,
}

function DumpWidgetComponent(props: DumpProps) {
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
      <Markdown>{props.dump.description}</Markdown>
      <div>
        <Button onClick={props.onEdit} variant="contained" color="primary" size="large" startIcon={<EditIcon />}>
          Edit
        </Button>
      </div>
    </div>
  )
}

DumpWidgetComponent.propTypes = propTypes
