import { applyMiddleware, combineReducers, createStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { dumpReducer } from './dump-store'

export const store = createStore(
  combineReducers({
    dumps: dumpReducer,
  }),
  applyMiddleware(thunk)
)

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
