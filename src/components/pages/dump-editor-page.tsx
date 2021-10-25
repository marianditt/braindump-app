import { Dump } from '../../types/dump-types'
import { updateDump } from '../../store/dump-store-actions'
import React from 'react'
import { EditorBase } from './editor-base-page'
import { DumpRouteParam } from '../../hooks/navigation-hook'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import { useDumpByIdSelector } from '../../hooks/dump-selector-hooks'
import { useAppDispatch } from '../../store/store'

interface DumpEditorPageProps {
  useDumpParam: () => DumpRouteParam
  useDumpByIdSelector: (routeParam?: string) => Dump | null
  useDispatch: () => any
}

const propTypes = {
  useDumpParam: PropTypes.func.isRequired,
  useDumpByIdSelector: PropTypes.func.isRequired,
  useDispatch: PropTypes.func.isRequired,
}

export function DumpEditorPage(props: DumpEditorPageProps) {
  const routeParams = props.useDumpParam()
  const selectedDump = props.useDumpByIdSelector(routeParams.dumpId)
  const dispatch = props.useDispatch()

  function onSave(dump: Dump): void {
    dispatch(updateDump(dump))
  }

  return <EditorBase title="Edit dump" selectedDump={selectedDump} onSave={onSave} />
}

DumpEditorPage.propTypes = propTypes

DumpEditorPage.defaultProps = {
  useDumpParam: () => useParams<DumpRouteParam>(),
  useDumpByIdSelector,
  useDispatch: useAppDispatch,
}
