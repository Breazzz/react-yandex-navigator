'use client'

import { useEffect, useMemo } from 'react'
import { DeleteTwoTone, DownCircleTwoTone } from '@ant-design/icons'
import { Button, Empty, Spin } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

import { setFrom, setTo } from '@/store/reducers/SuggestSlice'
import { getHistory, removeHistory } from '@/store/api/routeHistory.api'
import { useAppDispatch, useAppSelector } from '@/hooks/store'
import { FullAddress } from '@/store/types'
import Link from 'next/link'

interface ParsedRoute {
  from: string
  to: string
  id: string
  fullFrom: FullAddress
  fullTo: FullAddress
}

type TLink = {
  href: string
  text: string
}

export const RouteHistory = () => {
  const { history, loading } = useAppSelector((state) => state.history)
  const { from, to } = useAppSelector((state) => state.suggest)

  const dispatch = useAppDispatch()

  const mapRoute = usePathname() === '/'
  const router = useRouter()

  const link: TLink = {
    href: mapRoute ? '/history' : '/',
    text: mapRoute ? 'История' : 'На карту',
  }

  const historyList = useMemo(
    () =>
      history.map((route) => ({
        from: route.data?.from?.value,
        to: route.data?.to?.value,
        id: route.id,
        fullFrom: route.data?.from,
        fullTo: route.data?.to,
      })),
    [history],
  )

  useEffect(() => {
    dispatch(getHistory())
  }, [dispatch])

  const handleClickRoute = (route: ParsedRoute) => {
    dispatch(setFrom(route.fullFrom))
    dispatch(setTo(route.fullTo))
  }

  const checkActive = (route: ParsedRoute) => {
    return route.from === from.value && route.to === to.value
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(removeHistory(id))
  }

  if (!historyList.length) return <Empty description={false} />

  return (
    <Spin spinning={loading === 'pending'}>
      <div className='flex max-h-[calc(100vh-352px)] flex-col gap-2 overflow-y-auto'>
        {historyList.map((route) => (
          <div
            key={route.id}
            className='flex cursor-pointer items-center gap-2'
          >
            <DownCircleTwoTone twoToneColor='#FFCC01' className='text-[24px]' />
            <div
              className={`${
                checkActive(route) ? 'border-yellow-500 ' : ''
              }flex group/route relative w-full cursor-pointer flex-col items-start gap-1 rounded-md border p-2 pr-5 text-xs hover:border-yellow-500`}
              onClick={() => handleClickRoute(route)}
            >
              <span>{route.from}</span>
              <span>{route.to}</span>
              <div
                className='absolute right-2 top-1/2 flex -translate-y-1/2 opacity-0 transition-all hover:scale-125 group-hover/route:opacity-100'
                onClick={(e) => handleDelete(route.id, e)}
              >
                <DeleteTwoTone twoToneColor='#ff4949' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className='mt-4 w-full' onClick={() => router.push(link.href)}>
        {link.text}
      </Button>
    </Spin>
  )
}
