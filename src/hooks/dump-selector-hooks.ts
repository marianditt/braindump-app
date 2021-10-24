import { Dump } from '../types/dump-types'
import { RootState, useAppSelector } from '../store/store'
import { createSearchHash, scoreSearchResult } from '../services/search-service'

export function useDumpByIdSelector(dumpId?: string): Dump | null {
  return useAppSelector((state: RootState) => state.dumps.find((dump: Dump) => dump.id === dumpId) || null)
}

export function useDumpByFilterSelector(filter: string): Dump[] {
  return useAppSelector((globalState: RootState): Dump[] => {
    const scores = globalState.dumps.map((dump: Dump) => scoreDump(dump, filter))
    return filterDumps(globalState.dumps, scores)
  })
}

function scoreDump(dump: Dump, filter: string): number {
  const searchableDump = createSearchHash(dump.summary, dump.description, ...dump.tags)
  const searchableFilter = createSearchHash(filter)
  return scoreSearchResult(searchableDump, searchableFilter)
}

function filterDumps(dumps: Dump[], scores: number[]): Dump[] {
  const maxScore = Math.max(...scores)
  if (maxScore === 0) {
    return []
  }

  const maxIndexes = scores
    .map((score: number, index: number) => (score === maxScore ? index : -1))
    .filter((index: number) => index >= 0)
  return maxIndexes.map((index: number) => dumps[index])
}
