'use client'

import React, { useState, useEffect } from 'react'
import { AutoComplete } from 'antd'

import { useDebounce } from '@/hooks/useDebounce'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { resetSuggestions, setFrom, setTo } from '@/store/reducers/SuggestSlice'
import { getSuggestions } from '@/store/api/suggest.api'

export const Autocomplete: React.FC<{ name: string; value: string }> = ({
  name,
  value,
}) => {
  const [query, setQuery] = useState<string>('')

  const { suggestions } = useAppSelector((state) => state.suggest)
  const { from, to } = useAppSelector((state) => state.suggest)
  const dispatch = useAppDispatch()

  const debounced = useDebounce(query, 300)

  useEffect(() => {
    if (query && (!from.value || !to.value)) {
      setQuery('')
    }
  }, [from, to])

  useEffect(() => {
    if (debounced) {
      dispatch(getSuggestions(debounced))
    }
  }, [debounced, dispatch])

  useEffect(() => {
    if (value) {
      setQuery(value)
    }
  }, [value])

  const handleInputChange = (value: string): void => {
    setQuery(value)
  }

  const handleSelectSuggestion = (suggestion: string): void => {
    const fullSuggest = suggestions.find(
      (suggest) => suggest.value === suggestion,
    )
    dispatch(name === 'from' ? setFrom(fullSuggest) : setTo(fullSuggest))
    dispatch(resetSuggestions())
  }

  return (
    <div>
      <AutoComplete
        options={suggestions}
        style={{ width: '100%' }}
        onSelect={handleSelectSuggestion}
        onSearch={handleInputChange}
        value={query}
        placeholder={name === 'from' ? 'Откуда' : 'Куда'}
      />
    </div>
  )
}
