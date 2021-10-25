import { Action, Dispatch } from '@reduxjs/toolkit'
import { postDumps } from '../services/dump-service'
import { Dump } from '../types/dump-types'
import { DumpAction, DumpActionType, DumpListAction, DumpState, GetState } from './dump-store-types'

export function mergeDumps(dumps: Dump[]): any {
  const mergeDumpsAction: DumpListAction = {
    type: DumpActionType.MergeDumps,
    dumps: dumps,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>): void => {
    dispatch(mergeDumpsAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

export function addDump(dump: Dump): any {
  const addDumpAction: DumpAction = {
    type: DumpActionType.AddDump,
    dump: dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<DumpState>): void => {
    dispatch(addDumpAction)
    const newState: DumpState = getState()
    postDumps(newState.dumps)
  }
}

export function updateDump(dump: Dump): any {
  const setDumpAction: DumpAction = {
    type: DumpActionType.UpdateDump,
    dump: dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<DumpState>): void => {
    dispatch(setDumpAction)
    const newState: DumpState = getState()
    postDumps(newState.dumps)
  }
}

export function removeDump(dump: Dump): any {
  const removeDumpAction: DumpAction = {
    type: DumpActionType.RemoveDump,
    dump: dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<DumpState>): void => {
    dispatch(removeDumpAction)
    const newState: DumpState = getState()
    postDumps(newState.dumps)
  }
}
