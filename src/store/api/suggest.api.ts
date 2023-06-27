import axios, { AxiosError } from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { KnownError } from '@/store/types'

const AxiosInstance = axios.create({
  baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs',
})

export const getSuggestions = createAsyncThunk(
  'suggest/get',
  async (value: string, { rejectWithValue }) => {
    try {
      const { data } = await AxiosInstance.post(
        '/suggest/address',
        {
          query: value,
          count: 5,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${process.env.NEXT_PUBLIC_DADATA_TOKEN}`,
          },
        },
      )

      return data
    } catch (err) {
      const error: AxiosError<KnownError> = err as any
      return rejectWithValue(error.message)
    }
  },
)
