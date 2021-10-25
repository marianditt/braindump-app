import { Dump } from '../types/dump-types'

const LocalStorageKey = {
  DUMPS: 'dumps',
}

export function findAllDumps(): Dump[] {
  const data: string | null = window.localStorage.getItem(LocalStorageKey.DUMPS)
  if (data === null) {
    return []
  }

  try {
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

export function postDumps(dumps: Dump[]): void {
  const data = JSON.stringify(dumps)
  window.localStorage.setItem(LocalStorageKey.DUMPS, data)
}
