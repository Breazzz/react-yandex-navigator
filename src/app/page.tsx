'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('@/modules/Map').then((module) => module.Map),
  { ssr: false },
)

export default function Home() {
  return <Map />
}
