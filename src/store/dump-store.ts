import { Action } from '@reduxjs/toolkit'
import { findAllDumps } from '../services/dump-service'
import { Dump } from '../types/dump-types'
import { DumpAction, DumpActionType, DumpListAction } from './dump-store-types'

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
    case DumpActionType.MergeDumps: {
      const dumpListAction = action as DumpListAction
      return mergeDumpsAction(dumpListAction.dumps)
    }
    case DumpActionType.AddDump: {
      const dumpAction = action as DumpAction
      return addDumpAction(state, dumpAction.dump)
    }
    case DumpActionType.UpdateDump: {
      const dumpAction = action as DumpAction
      return updateDumpAction(state, dumpAction.dump)
    }
    case DumpActionType.RemoveDump:
      const dumpAction = action as DumpAction
      return removeDumpAction(state, dumpAction.dump)
  }
  return state
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
