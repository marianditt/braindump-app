import { Dispatch } from '@reduxjs/toolkit'

export interface Dump {
  id: string
  timestamp: number
  summary: string
  description: string
  tags: string[]
}

interface DumpAction {
  type: string
  dump: Dump
}

const DumpActionType = {
  ADD_DUMP: 'ADD_DUMP',
  SET_DUMP: 'SET_DUMP',
  REMOVE_DUMP: 'REMOVE_DUMP',
}

const loadInitialState = (): Dump[] => {
  const value = localStorage.getItem('dumps')
  if (value === null) {
    return []
  }
  return JSON.parse(value).dumps
}

const initialState = loadInitialState()

export const addDump = (dump: Dump) => {
  const addDumpAction: DumpAction = {
    type: DumpActionType.ADD_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<DumpAction>, getState: () => Dump[]) => {
    dispatch(addDumpAction)
    const newState = getState()
    localStorage.setItem('dumps', JSON.stringify(newState))
  }
}

export const setDump = (dump: Dump) => {
  const setDumpAction: DumpAction = {
    type: DumpActionType.SET_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<DumpAction>, getState: () => Dump[]) => {
    dispatch(setDumpAction)
    const newState = getState()
    localStorage.setItem('dumps', JSON.stringify(newState))
  }
}

export const removeDump = (dump: Dump) => {
  const removeDumpAction: DumpAction = {
    type: DumpActionType.REMOVE_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<DumpAction>, getState: () => Dump[]) => {
    dispatch(removeDumpAction)
    const newState = getState()
    localStorage.setItem('dumps', JSON.stringify(newState))
  }
}

export const dumpReducer = (state: Dump[] = initialState, action: DumpAction): Dump[] => {
  const addDumpAction = (state: Dump[], dump: Dump) => {
    return [...state, dump]
  }

  const setDumpAction = (state: Dump[], dump: Dump) => {
    const index = state.findIndex((d: Dump) => d.id === dump.id)
    if (index < 0) {
      return state
    }

    const newState = [...state]
    newState[index] = action.dump
    return newState
  }

  const removeDumpAction = (state: Dump[], dump: Dump) => {
    return state.filter((d: Dump) => d.id !== dump.id)
  }

  switch (action.type) {
    case DumpActionType.ADD_DUMP:
      return addDumpAction(state, action.dump)
    case DumpActionType.SET_DUMP:
      return setDumpAction(state, action.dump)
    case DumpActionType.REMOVE_DUMP:
      return removeDumpAction(state, action.dump)
  }
  return state
}
