import { withTheme } from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'
import Markdown from 'react-markdown'
import { Dump, dumpShape } from '../types/dump-types'
import PropTypes from 'prop-types'

export const DumpDetails = withTheme(styled(DumpDetailsComponent)`
  > div:last-child {
    text-align: right;
  }
`)

interface DumpDetailsProps {
  className: string
  dump: Dump
  onEdit: () => void
}

const propTypes = {
  className: PropTypes.string.isRequired,
  dump: PropTypes.shape(dumpShape).isRequired,
  onEdit: PropTypes.func,
}

function DumpDetailsComponent(props: DumpDetailsProps) {
  return (
    <div className={props.className}>
      <h1>{props.dump.summary}</h1>
      <Markdown>{props.dump.description}</Markdown>
    </div>
  )
}

DumpDetailsComponent.propTypes = propTypes
