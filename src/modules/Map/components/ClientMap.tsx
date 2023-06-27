'use client'

import { FC, useEffect, useState } from 'react'

export const ClientMap: FC = (props) => {
  const [Client, setClient] = useState<FC>()

  useEffect(() => {
    ;(async () => {
      if (typeof global.window !== 'undefined') {
        const { Map } = await import('./Map')
        setClient(() => Map)
      }
    })()
  }, [])

  if (typeof global.window === 'undefined' || !Client) {
    return null
  }

  return Client ? <Client {...props} /> : null
}
