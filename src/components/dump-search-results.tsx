import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, withTheme } from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
import { Dump, dumpShape } from '../types/dump-types'

export const DumpSearchResults = withTheme(styled(DumpSearchComponent)``)

interface SearchProps {
  dumps: Dump[]
  onDumpSelection: (dump: Dump) => void
  onDumpRemoval: (dump: Dump) => void
}

const propTypes = {
  dumps: PropTypes.arrayOf(PropTypes.shape(dumpShape).isRequired).isRequired,
  onDumpSelection: PropTypes.func.isRequired,
  onDumpRemoval: PropTypes.func.isRequired,
}

function DumpSearchComponent(props: SearchProps): JSX.Element {
  const listItems = props.dumps.map((dump: Dump) => (
    <ListItem key={dump.id} button onClick={() => props.onDumpSelection(dump)}>
      <ListItemText primary={dump.summary} secondary={new Date(dump.timestamp).toLocaleString()} />
      <ListItemSecondaryAction onClick={() => props.onDumpRemoval(dump)}>
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  ))

  return <List>{listItems}</List>
}

DumpSearchComponent.propTypes = propTypes
