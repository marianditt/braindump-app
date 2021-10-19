import { useParams } from 'react-router-dom'
import { DumpDetails } from '../dump-details'
import { Dump } from '../../types/dump-types'
import PropTypes from 'prop-types'
import { AppBar } from '../header/app-bar'
import { CancelButton } from '../header/cancel-button'
import React from 'react'
import { Container } from '@material-ui/core'
import { FloatingButton } from '../floating-button'
import { DumpRouteParam, Navigation, useNavigation } from '../../hooks/navigation-hook'
import { useCancelShortcut, useEditShortcut } from '../../hooks/shortcut-hooks'
import { EditButton } from '../header/edit-button'
import { useDumpByIdSelector } from '../../hooks/dump-selector-hooks'

interface ShowDumpViewProps {
  useDumpParam: () => DumpRouteParam
  useNavigation: () => Navigation
  useDumpByIdSelector: (dumpId?: string) => Dump | null
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
  useDumpByIdSelector: PropTypes.func.isRequired,
}

export function DumpDetailsPage(props: ShowDumpViewProps) {
  const routeParams = props.useDumpParam()
  const navigation = props.useNavigation()
  const dump = props.useDumpByIdSelector(routeParams.dumpId)

  useCancelShortcut(navigation.navigateHome)
  useEditShortcut(onEdit)

  function onEdit(): void {
    if (dump != null) {
      navigation.navigateToEdit(dump)
    }
  }

  return (
    <>
      <AppBar
        title="Braindump"
        primaryButton={<CancelButton onCancel={navigation.navigateHome} />}
        secondaryButton={<EditButton onEdit={onEdit} />}
      />

      <Container maxWidth={false}>
        {dump !== null && <DumpDetails dump={dump} onEdit={() => navigation.navigateToEdit(dump)} />}
        <FloatingButton onClick={navigation.navigateToCreate} />
      </Container>
    </>
  )
}

DumpDetailsPage.propTypes = propTypes

DumpDetailsPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useNavigation,
  useDumpByIdSelector,
}
