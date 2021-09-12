import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid4 } from 'uuid'

export interface Dump {
  id: string
  timestamp: Date
  summary: string
  description: string
  tags: string[]
}

function createDump(summary: string, description?: string): Dump {
  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ' +
    'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in ' +
    'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
    'Excepteur sint occaecat cupidatat non proident, ' +
    'sunt in culpa qui officia deserunt mollit anim id est laborum.'
  const descriptionValue = description || lorem

  return {
    id: uuid4(),
    timestamp: new Date(Date.now()),
    summary: summary,
    description: descriptionValue,
    tags: [],
  }
}

const initialState: Dump[] = [
  createDump('List sqlite tables'),
  createDump('Best YouTube video'),
  createDump('Summary 1'),
  createDump('Summary 2'),
  createDump('Summary 3'),
]

export const dumpSlice = createSlice({
  name: 'dumps',
  initialState: initialState,
  reducers: {},
})

export const {} = dumpSlice.actions
export const dumpReducer = dumpSlice.reducer
