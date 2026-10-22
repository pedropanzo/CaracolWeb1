import { useEffect, useMemo } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const schoolLocation = [-8.901, 13.218]

function MapViewport({ positions }) {
  const map = useMap()

  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [36, 36], maxZoom: 13 })
    } else {
      map.setView(schoolLocation, 12)
    }
  }, [map, positions])

  return null
}

function studentIcon(name) {
  const initials = name.split(' ').map((part) => part[0]).slice(0, 2).join('')
  return L.divIcon({
    className: 'transport-student-icon',
    html: `<span>${initials}</span>`,
    iconSize: [36, 42],
    iconAnchor: [18, 38],
    popupAnchor: [0, -36],
  })
}

const schoolIcon = L.divIcon({
  className: 'transport-school-icon',
  html: '<span>ESC</span>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -18],
})

export default function TransportMap({ passengers, routes, selectedRoute, setSelectedRoute }) {
  const students = useMemo(
    () => passengers.filter((student) => selectedRoute === 'Todas as rotas' || student.route === selectedRoute),
    [passengers, selectedRoute],
  )
  const positions = useMemo(
    () => [schoolLocation, ...students.map((student) => [student.latitude, student.longitude])],
    [students],
  )
  const visibleRoutes = routes.filter((route) => selectedRoute === 'Todas as rotas' || route.name === selectedRoute)

  return <section className="transport-map-section">
    <div className="transport-section-heading">
      <div><h2>Localização dos alunos</h2><p>Um marcador corresponde a um aluno no respectivo endereço de recolha.</p></div>
      <label className="transport-select-wrap"><span>Filtrar rota</span><select value={selectedRoute} onChange={(event) => setSelectedRoute(event.target.value)}><option>Todas as rotas</option>{routes.map((route) => <option key={route.id}>{route.name}</option>)}</select></label>
    </div>
    <div className="transport-map" aria-label="Mapa interactivo das localizações dos alunos em Luanda">
      <MapContainer center={schoolLocation} zoom={12} scrollWheelZoom className="transport-leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport positions={positions} />
        {visibleRoutes.map((route) => {
          const stops = students.filter((student) => student.route === route.name)
          return stops.length > 0 && <Polyline key={route.id} positions={[schoolLocation, ...stops.map((student) => [student.latitude, student.longitude])]} pathOptions={{ color: route.color, weight: 3, opacity: 0.68, dashArray: '7 8' }} />
        })}
        <Marker position={schoolLocation} icon={schoolIcon}>
          <Popup><strong>Complexo Escolar Fonte de Saber</strong><br />Ponto de destino das rotas</Popup>
        </Marker>
        {students.map((student) => <Marker key={student.id} position={[student.latitude, student.longitude]} icon={studentIcon(student.name)}>
          <Popup>
            <div className="transport-map-popup-content">
              <strong>{student.name}</strong>
              <span>{student.id} · {student.className}</span>
              <span>{student.address}</span>
              <span>Encarregado: {student.guardian}</span>
              <span>{student.phone}</span>
              <small>{student.route}</small>
            </div>
          </Popup>
        </Marker>)}
      </MapContainer>
      <div className="map-legend"><span className="legend-school" /> Escola <span className="legend-student" /> Alunos ({students.length})</div>
    </div>
    <div className="transport-route-strip">{routes.map((route) => <div className="route-strip-item" key={route.id}><span className="route-color" style={{ background: route.color }} /><div><strong>{route.name}</strong><small>{route.origin} → escola · saída {route.departure}</small></div><span className={`transport-status ${route.status === 'Em curso' ? 'status-active' : 'status-pending'}`}>{route.status}</span><span className="route-student-count">{passengers.filter((student) => student.route === route.name).length} alunos</span></div>)}</div>
  </section>
}