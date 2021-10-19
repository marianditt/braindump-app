import { DumpEditor } from '../dump-editor'
import { addDump } from '../../store/dump-store'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Dump } from '../../types/dump-types'
import PropTypes from 'prop-types'
import { Container } from '@material-ui/core'
import { AppBar } from '../header/app-bar'
import { CancelButton } from '../header/cancel-button'
import { Navigation, useNavigation } from '../../hooks/navigation-hook'

interface DumpCreatorPageProps {
  useNavigation: () => Navigation
}

const propTypes = {
  useNavigation: PropTypes.func.isRequired,
}

export function DumpCreatorPage(props: DumpCreatorPageProps) {
  const navigation = props.useNavigation()
  const dispatch = useDispatch<any>()

  const onSave = (dump: Dump) => {
    dispatch(addDump(dump))
    navigation.navigateToEdit(dump)
  }

  return (
    <>
      <AppBar title="Braindump" primaryButton={<CancelButton onCancel={navigation.navigateHome} />} />

      <Container maxWidth={false}>
        <h1>Create new dump</h1>
        <DumpEditor onSave={onSave} onCancel={navigation.navigateHome} />
      </Container>
    </>
  )
}

DumpCreatorPage.propTypes = propTypes

DumpCreatorPage.defaultProps = {
  useNavigation,
}
