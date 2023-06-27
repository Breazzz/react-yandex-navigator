'use client'

import { createControlComponent } from '@react-leaflet/core'
import 'leaflet-routing-machine'
// import marker from '@/assets/images/marker.png' // TODO: Replace icon '../../../assets/images/marker.png'

import 'leaflet'
import 'leaflet-routing-machine'
declare let L: any

const DefaultIcon = L.icon({
  iconUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yandex_Maps_icon.svg/1200px-Yandex_Maps_icon.svg.png',
  iconSize: [20, 20],
  iconAnchor: [10, 20],
})

L.Marker.prototype.options.icon = DefaultIcon

const createRouteMachineLayer = ({ route }: any) => {
  const instance = L.Routing.control({
    waypoints: route
      ? [
          L.latLng(route[0]?.data?.geo_lat, route[0]?.data?.geo_lon),
          L.latLng(route[1]?.data?.geo_lat, route[1]?.data?.geo_lon),
        ]
      : null,
    lineOptions: {
      styles: [{ color: '#FECB00', weight: 3 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: true,
    fitSelectedRoutes: false,
    showAlternatives: false,
    menuControlActive: false,
    controls: false,
  })

  return instance
}

const RouteMachine = createControlComponent(createRouteMachineLayer)

export default RouteMachine
