export type Loading = 'idle' | 'pending' | 'succeeded' | 'failed'

export type KnownError = {
  message: string
  description: string
  code: number | undefined
}

export interface Suggestion {
  value: string
}

export type FullAddress = {
  value: string
  unrestricted_value?: string
  data?: { [key: string]: string | number }
}

export interface SuggestState {
  from: FullAddress
  to: FullAddress
  loading: Loading
  suggestions: Suggestion[]
  error: string | undefined
}

export type History = {
  id: string
  data: SuggestState
}
