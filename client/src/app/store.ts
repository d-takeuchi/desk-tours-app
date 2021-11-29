import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import csrfReducer from '../slices/csrfSlice'

export const store = configureStore({
  reducer: {
    csrf: csrfReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
