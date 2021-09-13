import { EditDumpComponent } from '../components/edit-dump-component'
import { useHistory, useParams } from 'react-router-dom'
import { RootState, useAppDispatch, useAppSelector } from '../store/store'
import { Dump, setDump } from '../store/dumps'

export interface EditDumpRouteParams {
  dumpId: string
}

export function EditDumpView() {
  const history = useHistory<string>()

  const routeParams = useParams<EditDumpRouteParams>()

  const dumps: Dump[] = useAppSelector((state: RootState) =>
    state.dumps.filter((dump: Dump) => dump.id === routeParams.dumpId)
  )

  const dispatch = useAppDispatch()

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
