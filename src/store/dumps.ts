import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export interface Dump {
  id: string
  timestamp: Date
  summary: string
  description: string
  tags: string[]
}

const initialState: Dump[] = []

export const dumpSlice = createSlice({
  name: 'dumps',
  initialState: initialState,
  reducers: {
    addDump: (state: Draft<Dump[]>, action: PayloadAction<Dump>) => {
      return [...state, action.payload]
    },
  },
})

export const { addDump } = dumpSlice.actions
export const dumpReducer = dumpSlice.reducer
