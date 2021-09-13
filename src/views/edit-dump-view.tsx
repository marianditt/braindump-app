import { EditDumpComponent } from '../components/edit-dump-component'
import { useHistory, useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../store/store'
import { Dump, setDump } from '../store/dumps'
import { useDispatch } from 'react-redux'

export interface EditDumpRouteParams {
  dumpId: string
}

export function EditDumpView() {
  const history = useHistory<string>()

  const routeParams = useParams<EditDumpRouteParams>()

  const dumps: Dump[] = useAppSelector((state: RootState) =>
    state.dumps.filter((dump: Dump) => dump.id === routeParams.dumpId)
  )

  const dispatch = useDispatch<any>()

  const onSave = (dump: Dump) => {
    dispatch(setDump(dump))
    history.push('/')
  }

  return (
    <>
      <h2>Edit Dump</h2>
      {dumps.length === 1 ? <EditDumpComponent onSave={onSave} dump={dumps[0]} /> : null}
    </>
  )
}
