import { Action, Dispatch } from '@reduxjs/toolkit'
import { Dump } from '../types/dump-types'
import { findAllDumps, postDumps } from '../services/dump-service'

export type GetState<T> = () => T

interface DumpListAction extends Action {
  type: string
  dumps: Dump[]
}

interface DumpAction extends Action {
  type: string
  dump: Dump
}

const DumpActionType = {
  SET_DUMPS: 'SET_DUMPS',
  ADD_DUMP: 'ADD_DUMP',
  UPDATE_DUMP: 'UPDATE_DUMP',
  REMOVE_DUMP: 'REMOVE_DUMP',
}

export function setDumps(dumps: Dump[]): any {
  const setDumpAction: DumpListAction = {
    type: DumpActionType.SET_DUMPS,
    dumps: dumps,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>) => {
    dispatch(setDumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

export function addDump(dump: Dump): any {
  const addDumpAction: DumpAction = {
    type: DumpActionType.ADD_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>) => {
    dispatch(addDumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

export function updateDump(dump: Dump): any {
  const setDumpAction: DumpAction = {
    type: DumpActionType.UPDATE_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<DumpAction>, getState: GetState<Dump[]>) => {
    dispatch(setDumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

export function removeDump(dump: Dump): any {
  const removeDumpAction: DumpAction = {
    type: DumpActionType.REMOVE_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<DumpAction>, getState: GetState<Dump[]>) => {
    dispatch(removeDumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

const initialState = findAllDumps()

export function dumpReducer(state: Dump[] = initialState, action: Action): Dump[] {
  function setDumpsAction(dumps: Dump[]): Dump[] {
    return [...dumps]
  }

  function addDumpAction(state: Dump[], dump: Dump): Dump[] {
    return [...state, dump]
  }

  function updateDumpAction(state: Dump[], dump: Dump): Dump[] {
    const index = state.findIndex((d: Dump) => d.id === dump.id)
    if (index < 0) {
      return state
    }

    const newState = [...state]
    newState[index] = dump
    return newState
  }

  function removeDumpAction(state: Dump[], dump: Dump): Dump[] {
    return state.filter((d: Dump) => d.id !== dump.id)
  }

  switch (action.type) {
    case DumpActionType.SET_DUMPS: {
      const dumpListAction = action as DumpListAction
      return setDumpsAction(dumpListAction.dumps)
    }
    case DumpActionType.ADD_DUMP: {
      const dumpAction = action as DumpAction
      return addDumpAction(state, dumpAction.dump)
    }
    case DumpActionType.UPDATE_DUMP: {
      const dumpAction = action as DumpAction
      return updateDumpAction(state, dumpAction.dump)
    }
    case DumpActionType.REMOVE_DUMP:
      const dumpAction = action as DumpAction
      return removeDumpAction(state, dumpAction.dump)
  }
  return state
}
