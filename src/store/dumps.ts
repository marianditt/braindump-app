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

export const dumpReducer = (state: Dump[] = initialState, action: DumpAction): Dump[] => {
  switch (action.type) {
    case DumpActionType.ADD_DUMP:
      return [...state, action.dump]
    case DumpActionType.SET_DUMP:
      const index = state.findIndex((dump: Dump) => dump.id === action.dump.id)
      if (index < 0) {
        return state
      }

      const newState = [...state]
      newState[index] = action.dump
      return newState
  }
  return state
}
