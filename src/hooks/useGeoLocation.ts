import { useEffect, useState } from 'react'

type Location = {
  latitude: number
  longitude: number
}

type Error = {
  message: string
}

type GeoLocationState = {
  location: Location | null
  error: Error | null
}

export const useGeoLocation = (): GeoLocationState => {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const handleGeoLocation = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords
      setLocation({ latitude, longitude })
    }

    const handleError = (error: GeolocationPositionError) => {
      setError({ message: error.message })
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeoLocation, handleError)
    } else {
      setError({ message: 'Геолокация не поддерживается вашим браузером' })
    }
  }, [])

  return { location, error }
}
