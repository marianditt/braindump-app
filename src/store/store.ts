import { configureStore } from '@reduxjs/toolkit'
import { dumpReducer } from './dumps'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const store = configureStore({
  reducer: {
    dumps: dumpReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = ReturnType<typeof store.dispatch>
export const useAppDispatch = () => useDispatch<AppDispatch>()
