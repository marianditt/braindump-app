import { CreateComponent } from '../components/create-component'
import { addDump, Dump } from '../store/dumps'
import { useAppDispatch } from '../store/store'
import { useHistory } from 'react-router-dom'
import React from 'react'

export function CreateView() {
  const history = useHistory<string>()

  const dispatch = useAppDispatch()

  const onSave = (dump: Dump) => {
    dispatch(addDump(dump))
    history.push('/')
  }

  return (
    <>
      <h2>Create new dump</h2>
      <CreateComponent onSave={onSave} />
    </>
  )
}
