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
  const parseParagraphs = (text: string, nextParser: (text: string) => JSX.Element): JSX.Element => {
    const elements = text.split('\n\n').map((part: string) => <p>{nextParser(part)}</p>)
    return <>{elements}</>
  }

  const parseLinebreak = (text: string, nextParser: (test: string) => JSX.Element): JSX.Element => {
    const elements = text.split('\n').map((part: string) => (
      <>
        {nextParser(part)}
        <br />
      </>
    ))
    return <>{elements}</>
  }

  const parseText = (text: string): JSX.Element => {
    return <>{text}</>
  }

  const formattedDescription = parseParagraphs(props.dump.description, (x: string) => parseLinebreak(x, parseText))

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
