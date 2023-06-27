import { createSlice } from '@reduxjs/toolkit'
import { getSuggestions } from '@/store/api/suggest.api'
import { SuggestState } from '@/store/types'

const initialState = {
  from: { value: '' },
  to: { value: '' },
  loading: 'idle',
  suggestions: [],
  error: '',
} as SuggestState

export const suggestSlice = createSlice({
  name: 'suggest',
  initialState,
  reducers: {
    setFrom: (state, action) => {
      state.from = action.payload
    },
    setTo: (state, action) => {
      state.to = action.payload
    },
    resetSuggestions: (state) => {
      state.suggestions = []
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSuggestions.pending, (state) => {
      state.suggestions = []
      state.loading = 'pending'
    })
    builder.addCase(getSuggestions.fulfilled, (state, action) => {
      state.suggestions = action.payload.suggestions
      state.loading = 'succeeded'
    })
    builder.addCase(getSuggestions.rejected, (state, action) => {
      state.error = action.error.message
    })
  },
})

export const { setFrom, setTo, resetSuggestions } = suggestSlice.actions

export default suggestSlice.reducer
