import { AppBar as ReactAppBar, Toolbar, Typography, withTheme } from '@material-ui/core'
import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

export const AppBar = withTheme(styled(AppBarComponent)`
  flex-grow: 1;

  & > div > h6 {
    flex-grow: 1;
  }
`)

interface AppBarProps {
  className: string
  title: string
  children: JSX.Element
}

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

function AppBarComponent(props: AppBarProps): JSX.Element {
  return (
    <ReactAppBar className={props.className} position="static">
      <Toolbar>
        {props.children}
        <Typography variant="h6">{props.title}</Typography>
      </Toolbar>
    </ReactAppBar>
  )
}

AppBarComponent.propTypes = propTypes
