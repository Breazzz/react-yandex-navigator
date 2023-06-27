import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { FullAddress, KnownError } from '@/store/types'

const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_HISTORY_API,
})

export const getHistory = createAsyncThunk(
  'history/get',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.get('/history', {
        params: {
          sortBy: 'id',
          order: 'desc',
        },
      })

      return data
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      return rejectWithValue(error.message)
    }
  },
)

export const postHistory = createAsyncThunk(
  'history/post',
  async (data: { [key: string]: FullAddress }, { rejectWithValue }) => {
    try {
      const { data: res } = await AxiosInstance.post('/history', {
        data,
      })

      return res
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      return rejectWithValue(error.message)
    }
  },
)

export const removeHistory = createAsyncThunk(
  'history/remove',
  async (data: string, { rejectWithValue }) => {
    try {
      const { data: res } = await AxiosInstance.delete(`/history/${data}`)

      return res
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      return rejectWithValue(error.message)
    }
  },
)
