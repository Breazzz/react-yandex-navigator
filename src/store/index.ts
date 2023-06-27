import { configureStore } from '@reduxjs/toolkit'
import suggestSlice from '@/store/reducers/SuggestSlice'
import historySlice from '@/store/reducers/RouteHistorySlice'

export const store = configureStore({
  reducer: {
    suggest: suggestSlice,
    history: historySlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
