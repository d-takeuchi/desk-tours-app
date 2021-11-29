import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface CsrfState {
  csrfTokenExp: boolean
}

const initialState: CsrfState = {
  csrfTokenExp: false,
}

export const csrfSlice = createSlice({
  name: 'csrf',
  initialState,
  reducers: {
    toggleCsrfState: (state) => {
      state.csrfTokenExp = !state.csrfTokenExp
    },
  },
})

export const { toggleCsrfState } = csrfSlice.actions

export const selectCsrfState = (state: RootState) => state.csrf.csrfTokenExp

export default csrfSlice.reducer
