import { Theme, withTheme } from '@material-ui/core'
import React from 'react'
import Markdown from 'react-markdown'
import styled, { ThemeProps } from 'styled-components'

export const DumpDetailsContent = withTheme(styled(DumpDetailsContentComponent)`
  ${(props: ThemeProps<any>) => props.theme.typography};

  h1 {
    ${(props) => props.theme.typography.h4};
  }

  h2 {
    ${(props: ThemeProps<any>) => props.theme.typography.h5};
  }

  h3,
  h4,
  h5,
  h6 {
    ${(props: ThemeProps<any>) => props.theme.typography.h6};
  }

  img {
    max-width: 100%;
    max-height: 50vh;
  }

  *:not(pre) > code,
  pre {
    border: solid thin #d3d3d3;
    border-radius: 5px;
    background-color: #efefef;
  }

  *:not(pre) > code {
    padding: 3px;
  }

  pre {
    padding: ${(props: ThemeProps<Theme>) => props.theme.spacing(1, 1, 1, 1)};
  }
`)

interface DumpDetailsContentProps {
  className: string
  content: string
}

function DumpDetailsContentComponent(props: DumpDetailsContentProps): JSX.Element {
  return <Markdown className={props.className}>{props.content}</Markdown>
}
