import { Action, Dispatch } from '@reduxjs/toolkit'
import { postDumps } from '../services/dump-service'
import { Dump } from '../types/dump-types'
import { DumpAction, DumpActionType, DumpListAction, GetState } from './dump-store-types'

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
  return dispatchDumpAction(DumpActionType.AddDump, dump)
}

export function updateDump(dump: Dump): any {
  return dispatchDumpAction(DumpActionType.UpdateDump, dump)
}

export function removeDump(dump: Dump): any {
  return dispatchDumpAction(DumpActionType.RemoveDump, dump)
}

function dispatchDumpAction(type: DumpActionType, dump: Dump): any {
  const dumpAction: DumpAction = {
    type,
    dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>): void => {
    dispatch(dumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}
