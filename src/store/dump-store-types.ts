import { Action } from '@reduxjs/toolkit'
import { Dump } from '../types/dump-types'

export type GetState<T> = () => T

export interface DumpState {
  dumps: Dump[]
}

export interface DumpListAction extends Action {
  type: DumpActionType
  dumps: Dump[]
}

export interface DumpAction extends Action {
  type: DumpActionType
  dump: Dump
}

export enum DumpActionType {
  MergeDumps = 'MergeDumps',
  AddDump = 'AddDump',
  UpdateDump = 'UpdateDump',
  RemoveDump = 'RemoveDump',
}
