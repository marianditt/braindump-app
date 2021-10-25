import { Container, Theme, Typography, withTheme } from '@material-ui/core'
import PropTypes from 'prop-types'
import styled, { ThemeProps } from 'styled-components'

export const PageContent = withTheme(styled(PageContentComponent)`
  margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(0, 0, 15)};

  > h6 {
    margin: ${(props: ThemeProps<Theme>) => props.theme.spacing(2, 0, 2)};
  }
`)

interface PageContentComponentProps {
  className: string
  title: string | null
  children: JSX.Element[]
}

const propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
}

function PageContentComponent(props: PageContentComponentProps): JSX.Element {
  return (
    <Container className={props.className} maxWidth={false}>
      {props.title !== null && <Typography variant="h6">{props.title}</Typography>}
      {props.children}
    </Container>
  )
}

PageContentComponent.propTypes = propTypes

PageContentComponent.defaultProps = {
  title: null,
}
