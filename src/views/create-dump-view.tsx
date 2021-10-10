import { DumpEditor } from '../components/dump-editor'
import { addDump } from '../store/dump-store'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Dump } from '../types/dump-types'
import PropTypes from 'prop-types'

interface CreateDumpViewProps {
  onSave: (dump: Dump) => void
  onCancel: () => void
}

const propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export function CreateDumpView(props: CreateDumpViewProps) {
  const dispatch = useDispatch<any>()

  const onSave = (dump: Dump) => {
    dispatch(addDump(dump))
    props.onSave(dump)
  }

  const onCancel = () => {
    props.onCancel()
  }

  return (
    <>
      <h2>Create new dump</h2>
      <DumpEditor onSave={onSave} onCancel={onCancel} />
    </>
  )
}

CreateDumpView.propTypes = propTypes
