import { createSlice } from '@reduxjs/toolkit'
import { History, Loading } from '@/store/types'
import {
  getHistory,
  postHistory,
  removeHistory,
} from '@/store/api/routeHistory.api'

const initialState: {
  history: History[]
  loading: Loading
  error: string | undefined
} = {
  history: [],
  loading: 'idle',
  error: '',
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.history.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHistory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(getHistory.fulfilled, (state, action) => {
      state.history = action.payload
      state.loading = 'succeeded'
    })
    builder.addCase(getHistory.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(postHistory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(postHistory.fulfilled, (state, action) => {
      state.history.unshift(action.payload)
      state.loading = 'succeeded'
    })
    builder.addCase(postHistory.rejected, (state, action) => {
      state.error = action.error.message
    })
    builder.addCase(removeHistory.pending, (state) => {
      state.loading = 'pending'
    })
    builder.addCase(removeHistory.fulfilled, (state, action) => {
      state.history = state.history.filter(
        (route) => route.id !== action.payload.id,
      )
      state.loading = 'succeeded'
    })
    builder.addCase(removeHistory.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})

export const { addHistory } = historySlice.actions

export default historySlice.reducer
