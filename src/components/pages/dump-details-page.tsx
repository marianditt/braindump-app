import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDumpByIdSelector } from '../../hooks/dump-selector-hooks'
import { DumpRouteParam, Navigation, useNavigation } from '../../hooks/navigation-hook'
import { useCancelShortcut, useEditShortcut } from '../../hooks/shortcut-hooks'
import { removeDump } from '../../store/dump-store-actions'
import { Dump } from '../../types/dump-types'
import { DumpDetails } from '../dump-details'
import { FloatingButton } from '../floating-button'
import { ActionButton } from '../header/action-button'
import { AppBar } from '../header/app-bar'
import { PageContent } from './page-content'

interface ShowDumpViewProps {
  useDumpParam: () => DumpRouteParam
  useNavigation: () => Navigation
  useDumpByIdSelector: (dumpId?: string) => Dump | null
  useDispatch: () => any
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useNavigation: PropTypes.func.isRequired,
  useDumpByIdSelector: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
}

export function DumpDetailsPage(props: ShowDumpViewProps) {
  const routeParams = props.useDumpParam()
  const navigation = props.useNavigation()
  const dump = props.useDumpByIdSelector(routeParams.dumpId)
  const dispatch = props.useDispatch()

  useCancelShortcut(navigation.navigateHome)
  useEditShortcut(onEdit)

  function onEdit(): void {
    if (dump !== null) {
      navigation.navigateToEdit(dump)
    }
  }

  function onDelete(): void {
    if (dump !== null) {
      dispatch(removeDump(dump))
      navigation.navigateHome()
    }
  }

  return (
    <>
      <AppBar
        title="Braindump"
        primaryButton={<ActionButton action="back" onClick={navigation.navigateHome} edge="start" />}
        secondaryButton={
          <>
            <ActionButton action="edit" disabled={dump === null} onClick={onEdit} edge="end" />
            <ActionButton action="delete" disabled={dump === null} onClick={onDelete} edge="end" />
          </>
        }
      />

      <PageContent>
        {dump !== null && <DumpDetails dump={dump} />}
        <FloatingButton onClick={navigation.navigateToCreate} />
      </PageContent>
    </>
  )
}

DumpDetailsPage.propTypes = propTypes

DumpDetailsPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useNavigation,
  useDumpByIdSelector,
  useDispatch: () => useDispatch<any>(),
}
