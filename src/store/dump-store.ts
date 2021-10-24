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
  MERGE_DUMPS: 'MERGE_DUMPS',
  ADD_DUMP: 'ADD_DUMP',
  UPDATE_DUMP: 'UPDATE_DUMP',
  REMOVE_DUMP: 'REMOVE_DUMP',
}

export function mergeDumps(dumps: Dump[]): any {
  const mergeDumpsAction: DumpListAction = {
    type: DumpActionType.MERGE_DUMPS,
    dumps: dumps,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>): void => {
    dispatch(mergeDumpsAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

function resolveMergeConflict(left: Dump | null, right: Dump): Dump {
  if (left === null) {
    return right
  }

  const [mergedSummary, hasSummaryConflict] = resolveSummaryMergeConflict(left.summary, right.summary)
  const [mergedDescription, hasDescriptionConflict] = resolveDescriptionMergeConflict(
    left.description,
    right.description
  )
  const prefix = hasSummaryConflict || hasDescriptionConflict ? 'CONFLICT: ' : ''

  const tags = new Map<string, boolean>()
  left.tags.forEach((tag) => tags.set(tag, true))
  right.tags.forEach((tag) => tags.set(tag, true))

  return {
    id: left.id,
    summary: prefix + mergedSummary,
    description: mergedDescription,
    tags: Array.from(tags.keys()),
    timestamp: Math.min(left.timestamp, right.timestamp),
  }
}

function resolveSummaryMergeConflict(left: string, right: string): [string, boolean] {
  if (left === right) {
    return [left, false]
  } else {
    return [`${left} --- ${right}`, true]
  }
}

function resolveDescriptionMergeConflict(left: string, right: string): [string, boolean] {
  if (left === right) {
    return [left, false]
  } else {
    return [`${left}\n\n---\n\n${right}`, true]
  }
}

export function addDump(dump: Dump): any {
  const addDumpAction: DumpAction = {
    type: DumpActionType.ADD_DUMP,
    dump: dump,
  }

  return (dispatch: Dispatch<Action>, getState: GetState<Dump[]>): void => {
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

  return (dispatch: Dispatch<DumpAction>, getState: GetState<Dump[]>): void => {
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

  return (dispatch: Dispatch<DumpAction>, getState: GetState<Dump[]>): void => {
    dispatch(removeDumpAction)
    const newState: Dump[] = getState()
    postDumps(newState)
  }
}

const initialState = findAllDumps()

export function dumpReducer(state: Dump[] = initialState, action: Action): Dump[] {
  function mergeDumpsAction(dumps: Dump[]): Dump[] {
    const merge = new Map<string, Dump>()
    state.forEach((dump) => merge.set(dump.id, dump))
    dumps.forEach((dump) => merge.set(dump.id, resolveMergeConflict(merge.get(dump.id) || null, dump)))
    return Array.from(merge.values())
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
    case DumpActionType.MERGE_DUMPS: {
      const dumpListAction = action as DumpListAction
      return mergeDumpsAction(dumpListAction.dumps)
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
