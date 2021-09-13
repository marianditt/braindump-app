import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'

export interface Dump {
  id: string
  timestamp: number
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
    setDump: (state: Draft<Dump[]>, action: PayloadAction<Dump>) => {
      const index = state.findIndex((dump: Dump) => dump.id === action.payload.id)
      if (index < 0) {
        return state
      }

      const newState = [...state]
      newState[index] = action.payload
      return newState
    },
  },
})

export const { addDump, setDump } = dumpSlice.actions
export const dumpReducer = dumpSlice.reducer
