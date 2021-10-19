import { DumpEditor } from '../dump-editor'
import { useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../../store/store'
import { updateDump } from '../../store/dump-store'
import { useDispatch } from 'react-redux'
import { Dump } from '../../types/dump-types'
import { FloatingButton } from '../floating-button'
import React from 'react'
import { Container } from '@material-ui/core'
import { AppBar } from '../header/app-bar'
import { CancelButton } from '../header/cancel-button'
import PropTypes from 'prop-types'
import { DumpRouteParam, Navigation, useNavigation } from '../../hooks/navigation-hook'

interface DumpEditorPageProps {
  useDumpParam: () => DumpRouteParam
  useNavigation: () => Navigation
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
}

export function DumpEditorPage(props: DumpEditorPageProps) {
  const routeParams = props.useDumpParam()
  const navigation = props.useNavigation()

  const dump: Dump | null = useAppSelector(
    (state: RootState) => state.dumps.find((dump: Dump) => dump.id === routeParams.dumpId) || null
  )

  const dispatch = useDispatch<any>()

  const onSave = (dump: Dump) => {
    dispatch(updateDump(dump))
  }

  return (
    <>
      <AppBar title="Braindump" primaryButton={<CancelButton onCancel={navigation.navigateHome} />} />

      <Container maxWidth={false}>
        <h1>Edit Dump</h1>
        <DumpEditor dump={dump} onSave={onSave} onCancel={navigation.navigateHome} />
        <FloatingButton onClick={navigation.navigateToCreate} />
      </Container>
    </>
  )
}

DumpEditorPage.propTypes = propTypes

DumpEditorPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useNavigation,
}
