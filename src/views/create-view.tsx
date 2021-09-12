import { DumpForm } from '../components/dump-form'
import { Container } from '@material-ui/core'
import { addDump, Dump } from '../store/dumps'
import { useAppDispatch } from '../store/store'

export function CreateView() {
  const dispatch = useAppDispatch()

  const onSave = (dump: Dump) => {
    dispatch(addDump(dump))
  }

  return (
    <Container maxWidth="sm">
      <h1>Braindump</h1>
      <h2>Create new dump</h2>
      <DumpForm onSave={onSave} linkTo="/" />
    </Container>
  )
}
