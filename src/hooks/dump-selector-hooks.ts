import { Dump } from '../types/dump-types'
import { RootState, useAppSelector } from '../store/store'

export function useDumpByIdSelector(dumpId?: string): Dump | null {
  return useAppSelector((state: RootState) => state.dumps.find((dump: Dump) => dump.id === dumpId) || null)
}
