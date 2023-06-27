import { History } from '@/store/types'

const fetchHistory = async (): Promise<History[]> => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_HISTORY_API}/history?sortBy=id&order=desc`,
    {
      next: {
        revalidate: 10,
      },
    },
  )

  return data.json()
}

export default async function HistoryPage() {
  const data = await fetchHistory()

  return (
    <ul className='flex w-full flex-col gap-2 p-2'>
      {data.map(({ data, id }) => (
        <li key={id} className='border-2 p-2'>
          {data.from.value} - {data.to.value}
        </li>
      ))}
    </ul>
  )
}
