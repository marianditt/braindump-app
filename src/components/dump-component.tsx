import { withTheme } from '@material-ui/core'
import styled from 'styled-components'
import { Dump } from '../store/dumps'
import React from 'react'

export const DumpComponent = withTheme(styled(Component)``)

interface DumpProps {
  className: string
  dump: Dump
}

function Component(props: DumpProps) {
  return (
    <>
      <h2>{props.dump.summary}</h2>
      <p>{props.dump.description}</p>
    </>
  )
}
