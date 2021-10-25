import { Dump } from '../types/dump-types'

const LocalStorageKey = {
  Dumps: 'dumps',
}

export function findAllDumps(): Dump[] {
  const data: string | null = window.localStorage.getItem(LocalStorageKey.Dumps)
  if (data === null) {
    return []
  }

  try {
    return JSON.parse(data).dumps
  } catch (error) {
    return []
  }
}

export function postDumps(dumps: Dump[]): void {
  const data = JSON.stringify(dumps)
  window.localStorage.setItem(LocalStorageKey.Dumps, data)
}
