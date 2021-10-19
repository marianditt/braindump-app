import { useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../../store/store'
import { DumpWidget } from '../dump-widget'
import { Dump } from '../../types/dump-types'
import PropTypes from 'prop-types'
import { AppBar } from '../header/app-bar'
import { CancelButton } from '../header/cancel-button'
import React from 'react'
import { Container } from '@material-ui/core'
import { FloatingButton } from '../floating-button'
import { DumpRouteParam, Navigation, useNavigation } from '../../hooks/navigation-hook'

interface ShowDumpViewProps {
  useDumpParam: () => DumpRouteParam
  useNavigation: () => Navigation
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
}

export function DumpDetailsPage(props: ShowDumpViewProps) {
  const routeParams = props.useDumpParam()
  const navigation = props.useNavigation()

  const dump: Dump | null = useAppSelector(
    (state: RootState) => state.dumps.find((dump: Dump) => dump.id === routeParams.dumpId) || null
  )

  return (
    <>
      <AppBar title="Braindump" primaryButton={<CancelButton onCancel={navigation.navigateHome} />} />

      <Container maxWidth={false}>
        {dump !== null && <DumpWidget dump={dump} onEdit={() => navigation.navigateToEdit(dump)} />}
        <FloatingButton onClick={navigation.navigateToCreate} />
      </Container>
    </>
  )
}

DumpDetailsPage.propTypes = propTypes

DumpDetailsPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useNavigation,
}
