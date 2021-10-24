import { Card, CardContent, Theme, Typography, withTheme } from '@material-ui/core'
import styled, { ThemeProps } from 'styled-components'
import React from 'react'
import { Dump, dumpShape } from '../types/dump-types'
import PropTypes from 'prop-types'
import { DumpDetailsContent } from './dump-details-content'

export const DumpDetails = withTheme(styled(DumpDetailsComponent)`
  margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(2, 0, 2)};
`)

interface DumpDetailsProps {
  className: string
  dump: Dump
}

const propTypes = {
  className: PropTypes.string.isRequired,
  dump: PropTypes.shape(dumpShape).isRequired,
}

function DumpDetailsComponent(props: DumpDetailsProps) {
  return (
    <Card className={props.className}>
      <CardContent>
        <Typography variant="h6">{props.dump.summary}</Typography>
        <DumpDetailsContent content={props.dump.description} />
      </CardContent>
    </Card>
  )
}

DumpDetailsComponent.propTypes = propTypes
