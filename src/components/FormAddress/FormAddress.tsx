'use client'

import { Autocomplete } from '@/modules/Autocomplete'
import { Button, notification } from 'antd'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { postHistory } from '@/store/api/routeHistory.api'
import { setFrom, setTo } from '@/store/reducers/SuggestSlice'
import { History } from '@/store/types'

export const FormAddress = () => {
  const { from, to } = useAppSelector((state) => state.suggest)
  const { history } = useAppSelector((state) => state.history)
  const dispatch = useAppDispatch()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (route: History) => {
    api.warning({
      message: `Маршрут ${route.id} найден`,
      description: (
        <>
          <div>{route.data.from.value}</div>
          <div>{route.data.to.value}</div>
        </>
      ),
      placement: 'bottomRight',
    })
  }

  const handleSave = () => {
    const findHistory = history.find(
      (route) =>
        route.data.from.value === from.value &&
        route.data.to.value === to.value,
    )
    if (from.value && to.value && !findHistory) {
      dispatch(postHistory({ from, to }))
    } else if (findHistory) {
      openNotification(findHistory)
    }
  }

  const handleReset = () => {
    dispatch(setFrom({ value: '' }))
    dispatch(setTo({ value: '' }))
  }

  return (
    <>
      {contextHolder}
      <Autocomplete name='from' value={from?.value} />
      <Autocomplete name='to' value={to?.value} />
      <div className='flex gap-2'>
        <Button
          onClick={handleSave}
          type='primary'
          className='w-full bg-[#1677ff]'
        >
          Сохранить
        </Button>
        {from.value && to.value && <Button onClick={handleReset}>Сброс</Button>}
      </div>
    </>
  )
}
