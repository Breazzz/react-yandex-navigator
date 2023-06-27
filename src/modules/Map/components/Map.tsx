'use client'

import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/store'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

import 'leaflet'
declare let L: any

import RouteMachine from '@/modules/Map/components/RouteMachine'
import { ChangeView } from '@/modules/Map/utils/ChangeView'

import { FullAddress } from '@/store/types'

import 'leaflet/dist/leaflet.css'
import { useGeoLocation } from '@/hooks/useGeoLocation'

const DefaultIcon = L.icon({
  iconUrl:
    'https://cdn.icon-icons.com/icons2/652/PNG/512/yandex_cyr_icon-icons.com_59870.png',
  iconSize: [15, 15],
})

export const Map = () => {
  const { from, to } = useAppSelector((state) => state.suggest)
  const [currentRoute, setCurrentRoute] = useState<FullAddress[]>([])
  const { location } = useGeoLocation()

  const position: LatLngExpression = from.data
    ? [+from.data?.geo_lat, +from.data?.geo_lon]
    : location
    ? [location.latitude, location.longitude]
    : [55.75222, 37.61556]

  useEffect(() => {
    setCurrentRoute([])

    setTimeout(() => {
      setCurrentRoute([from, to])
    }, 0)
  }, [from, to])

  return (
    <div className='map'>
      <MapContainer
        style={{ height: '100vh' }}
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        attributionControl={false}
      >
        {location && (
          <Marker
            position={[location.latitude, location.longitude]}
            icon={DefaultIcon}
          />
        )}
        <ChangeView center={position} />
        <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png' />
        {currentRoute.length ? <RouteMachine route={currentRoute} /> : null}
      </MapContainer>
    </div>
  )
}
