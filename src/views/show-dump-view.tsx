import { useHistory, useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../store/store'
import { Dump } from '../store/dumps'
import { ShowDumpComponent } from '../components/show-dump-component'

export interface ShowDumpRouteParams {
  dumpId: string
}

export function ShowDumpView() {
  const history = useHistory<string>()

  const routeParams = useParams<ShowDumpRouteParams>()

  const dumps: Dump[] = useAppSelector((state: RootState) =>
    state.dumps.filter((dump: Dump) => dump.id === routeParams.dumpId)
  )

  const onEdit = () => {
    if (dumps.length === 1) {
      history.push(`/edit/dumps/${dumps[0].id}`)
    }
  }

  return <>{dumps.length === 1 ? <ShowDumpComponent dump={dumps[0]} onEdit={onEdit} /> : null}</>
}
