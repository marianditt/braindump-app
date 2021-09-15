import { EditDumpComponent } from '../components/edit-dump-component'
import { addDump, Dump } from '../store/dumps'
import { useHistory } from 'react-router-dom'
import React from 'react'
import { useDispatch } from 'react-redux'

export function CreateDumpView() {
  const history = useHistory<string>()

  const dispatch = useDispatch<any>()

  const onSave = (dump: Dump) => {
    dispatch(addDump(dump))
    history.push('/')
  }

  const onCancel = () => {
    history.push('/')
  }

  return (
    <>
      <h2>Create new dump</h2>
      <EditDumpComponent onSave={onSave} onCancel={onCancel} />
    </>
  )
}
