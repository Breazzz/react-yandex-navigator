import { useMap } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'

export const ChangeView = ({ center }: { center: LatLngExpression }) => {
  const map = useMap()
  map.setView(center)
  return null
}
