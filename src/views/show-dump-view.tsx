import { useParams } from 'react-router-dom'
import { RootState, useAppSelector } from '../store/store'
import { DumpWidget } from '../components/dump-widget'
import { Dump } from '../types/dump-types'
import PropTypes from 'prop-types'

interface ShowDumpViewProps {
  onEdit: (dumpId: string) => void
}

const propTypes = {
  onEdit: PropTypes.func.isRequired,
}

interface ShowDumpRouteParams {
  dumpId: string
}

export function ShowDumpView(props: ShowDumpViewProps) {
  const routeParams = useParams<ShowDumpRouteParams>()

  const dumps: Dump[] = useAppSelector((state: RootState) =>
    state.dumps.filter((dump: Dump) => dump.id === routeParams.dumpId)
  )

  const onEdit = () => {
    if (dumps.length === 1) {
      props.onEdit(dumps[0].id)
    }
  }

  return <>{dumps.length === 1 ? <DumpWidget dump={dumps[0]} onEdit={onEdit} /> : null}</>
}

ShowDumpView.propTypes = propTypes
