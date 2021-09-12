import { useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../store/store'
import { Dump } from '../store/dumps'
import { DumpComponent } from '../components/dump-component'

export interface DumpViewRouteParams {
  dumpId: string
}

export function DumpView() {
  const routeParams = useParams<DumpViewRouteParams>()

  const dumps: Dump[] = useAppSelector((state: RootState) =>
    state.dumps.filter((dump: Dump) => dump.id === routeParams.dumpId)
  )

  return <>{dumps.length === 1 ? <DumpComponent dump={dumps[0]} /> : null}</>
}
