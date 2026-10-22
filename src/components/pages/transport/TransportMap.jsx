import { useEffect, useMemo, useState } from 'react'
import L from 'leaflet'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const schoolLocation = [-8.901, 13.218]
const vehicleTracks = {
  'LD-42-18-AB': [[-8.972, 13.277], [-8.958, 13.266], [-8.944, 13.253], [-8.931, 13.242], [-8.917, 13.231], schoolLocation],
  'LD-19-63-CD': [[-8.951, 13.171], [-8.938, 13.182], [-8.927, 13.192], [-8.916, 13.202], [-8.906, 13.211], schoolLocation],
  'LD-88-04-EF': [[-8.968, 13.139], [-8.954, 13.153], [-8.941, 13.169], [-8.927, 13.184], [-8.913, 13.199], schoolLocation],
  'LD-31-55-GH': [[-8.874, 13.252]],
}

async function fetchRoadPath(positions) {
  const coordinates = positions.map(([latitude, longitude]) => `${longitude},${latitude}`).join(';')
  const response = await fetch(`https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`, { signal: AbortSignal.timeout(8000) })
  if (!response.ok) throw new Error('Serviço de rotas indisponível')
  const result = await response.json()
  const roadCoordinates = result.routes?.[0]?.geometry?.coordinates
  if (!roadCoordinates?.length) throw new Error('Rota rodoviária não encontrada')
  return roadCoordinates.map(([longitude, latitude]) => [latitude, longitude])
}

function positionOnRoute(positions, distance) {
  if (positions.length < 2) return positions[0] || schoolLocation
  let remaining = distance
  for (let index = 1; index < positions.length; index += 1) {
    const start = positions[index - 1]
    const end = positions[index]
    const segment = L.latLng(start).distanceTo(L.latLng(end))
    if (remaining <= segment) {
      const progress = segment ? remaining / segment : 0
      return [start[0] + (end[0] - start[0]) * progress, start[1] + (end[1] - start[1]) * progress]
    }
    remaining -= segment
  }
  return positions[positions.length - 1]
}

function bearingOnRoute(positions, distance) {
  let remaining = distance
  for (let index = 1; index < positions.length; index += 1) {
    const start = positions[index - 1]
    const end = positions[index]
    const segment = L.latLng(start).distanceTo(L.latLng(end))
    if (remaining <= segment) {
      const radians = Math.PI / 180
      const latitudeStart = start[0] * radians
      const latitudeEnd = end[0] * radians
      const longitudeDelta = (end[1] - start[1]) * radians
      const y = Math.sin(longitudeDelta) * Math.cos(latitudeEnd)
      const x = Math.cos(latitudeStart) * Math.sin(latitudeEnd) - Math.sin(latitudeStart) * Math.cos(latitudeEnd) * Math.cos(longitudeDelta)
      return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360
    }
    remaining -= segment
  }
  return 0
}

function routeLength(positions) {
  return positions.slice(1).reduce((total, point, index) => total + L.latLng(positions[index]).distanceTo(L.latLng(point)), 0)
}

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

function studentIcon(photo, name) {
  const safePhoto = photo || 'https://randomuser.me/api/portraits/lego/1.jpg'
  return L.divIcon({
    className: 'transport-student-icon',
    html: `<span><img src="${safePhoto}" alt="${name}" /></span>`,
    iconSize: [44, 50],
    iconAnchor: [22, 46],
    popupAnchor: [0, -44],
  })
}

const schoolIcon = L.divIcon({
  className: 'transport-school-icon',
  html: '<span>ESC</span>',
  iconSize: [42, 42],
  iconAnchor: [21, 21],
  popupAnchor: [0, -18],
})

function vehicleIcon(vehicle, heading = 0) {
  const isCoaster = /coaster/i.test(vehicle.model)
  const isHiace = /hiace/i.test(vehicle.model)
  const isBus = /coaster|county|rosa|bus/i.test(vehicle.model) && !isHiace
  const busSvg = `
    <ellipse cx="32" cy="50" rx="22" ry="39" fill="#000" opacity=".38"/>
    <path d="M21 6h22c6 0 10 5 10 11v59c0 7-4 11-10 11H21c-6 0-10-4-10-11V17c0-6 4-11 10-11Z" fill="#f6f8f9" stroke="#aeb8be" stroke-width="2"/>
    <path d="M17 19c0-4 3-7 7-7h16c4 0 7 3 7 7v9H17v-9Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/>
    <path d="M17 32h30v37H17z" fill="#dce4e8" stroke="#b5c0c6" stroke-width="2"/>
    <path d="M20 35h24v30H20z" fill="#405a68"/><path d="M20 44h24M20 54h24" stroke="#c5d0d5" stroke-width="2"/>
    <path d="M17 73h30v4c0 4-3 7-7 7H24c-4 0-7-3-7-7v-4Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/>
    <path d="M9 22h5v13H9m0 19h5v13H9m41-45h5v13h-5m0 19h5v13h-5" fill="#252c31"/>
    <path d="M21 8h5v3h-5m12-3h5v3h-5" fill="#ffe6a2"/><path d="M21 84h5v3h-5m12-3h5v3h-5" fill="#d94d45"/>
  `
  const carSvg = `
    <ellipse cx="32" cy="51" rx="18" ry="36" fill="#000" opacity=".38"/>
    <path d="M32 7c-6 0-9 4-11 10l-7 18v29c0 5 2 9 4 12l2 8c4 3 8 4 12 4s8-1 12-4l2-8c2-3 4-7 4-12V35l-7-18c-2-6-5-10-11-10Z" fill="#f6f8f9" stroke="#aeb8be" stroke-width="2"/>
    <path d="m22 19 3-6h14l3 6 4 12H18l4-12Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/>
    <path d="M18 35h28l2 5H16l2-5Z" fill="#e5eaed"/><path d="M18 42h28v14H18z" fill="#dce4e8" stroke="#b8c3c9" stroke-width="2"/><path d="M21 44h22v10H21z" fill="#405a68"/>
    <path d="M17 60h30l-3 11H20l-3-11Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/><path d="m20 74 24 0-3 8H23l-3-8Z" fill="#f0f3f4"/>
    <path d="M9 30h6v12H9m0 13h6v12H9m40-37h6v12h-6m0 13h6v12h-6" fill="#252c31"/>
    <path d="M18 11h5v3h-5m18-3h5v3h-5" fill="#ffe6a2"/><path d="M21 81h5v3h-5m12-3h5v3h-5" fill="#d94d45"/>
  `
  const hiaceSvg = `
    <ellipse cx="32" cy="50" rx="21" ry="39" fill="#000" opacity=".38"/>
    <path d="M21 5h22c7 0 11 5 11 12v60c0 7-4 11-11 11H21c-7 0-11-4-11-11V17c0-7 4-12 11-12Z" fill="#f6f8f9" stroke="#aeb8be" stroke-width="2"/>
    <path d="M17 17c0-4 3-7 7-7h16c4 0 7 3 7 7v13H17V17Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/>
    <path d="M17 34h30v34H17z" fill="#dce4e8" stroke="#b5c0c6" stroke-width="2"/><path d="M20 37h24v28H20z" fill="#405a68"/>
    <path d="M20 46h24m-24 10h24" stroke="#c5d0d5" stroke-width="2"/>
    <path d="M17 72h30v5c0 4-3 7-7 7H24c-4 0-7-3-7-7v-5Z" fill="#405a68" stroke="#d0d7db" stroke-width="2"/>
    <path d="M9 22h5v12H9m0 18h5v12H9m41-42h5v12h-5m0 18h5v12h-5" fill="#252c31"/>
    <path d="M21 7h5v3h-5m12-3h5v3h-5" fill="#ffe6a2"/><path d="M21 83h5v3h-5m12-3h5v3h-5" fill="#d94d45"/>
  `
  const vehicleSvg = isBus ? busSvg : isHiace ? hiaceSvg : carSvg
  const vehicleClass = isCoaster ? 'vehicle-type-coaster' : isHiace ? 'vehicle-type-hiace' : isBus ? 'vehicle-type-bus' : 'vehicle-type-car'
  const scale = isCoaster ? 1.16 : isBus ? 1 : isHiace ? 0.78 : 0.78

  return L.divIcon({
    className: `transport-live-vehicle-icon ${vehicleClass}`,
    html: `<span class="vehicle-model" style="transform:rotate(${heading}deg) scale(${scale})"><svg viewBox="0 0 64 92" role="img" aria-label="${vehicle.model}"><title>${vehicle.model}</title>${vehicleSvg}</svg></span>`,
    iconSize: [72, 92],
    iconAnchor: [36, 46],
    popupAnchor: [0, -28],
    title: `${vehicle.model} ${vehicle.id}`,
  })
}

export default function TransportMap({ passengers, routes, selectedRoute, setSelectedRoute }) {
  const [roadPaths, setRoadPaths] = useState({})
  const students = useMemo(
    () => passengers.filter((student) => selectedRoute === 'Todas as rotas' || student.route === selectedRoute),
    [passengers, selectedRoute],
  )
  const positions = useMemo(
    () => [schoolLocation, ...students.map((student) => [student.latitude, student.longitude])],
    [students],
  )
  const visibleRoutes = useMemo(() => routes.filter((route) => selectedRoute === 'Todas as rotas' || route.name === selectedRoute), [routes, selectedRoute])
  const routeWaypoints = useMemo(() => visibleRoutes.map((route) => {
    const stops = students.filter((student) => student.route === route.name)
    return { route, positions: [schoolLocation, ...stops.map((student) => [student.latitude, student.longitude]), schoolLocation] }
  }), [visibleRoutes, students])

  useEffect(() => {
    let active = true
    Promise.all(routeWaypoints.map(async ({ route, positions: waypoints }) => {
      try {
        return [route.id, await fetchRoadPath(waypoints)]
      } catch {
        return [route.id, waypoints]
      }
    })).then((entries) => {
      if (active) setRoadPaths(Object.fromEntries(entries))
    })
    return () => { active = false }
  }, [routeWaypoints])

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
          return stops.length > 0 && <Polyline key={route.id} positions={roadPaths[route.id] || [schoolLocation, ...stops.map((student) => [student.latitude, student.longitude]), schoolLocation]} className="transport-route-line" pathOptions={{ color: route.color, weight: 4, opacity: 0.9, dashArray: '10 12' }} />
        })}
        <Marker position={schoolLocation} icon={schoolIcon}>
          <Popup><strong>Complexo Escolar Fonte de Saber</strong><br />Ponto de destino das rotas</Popup>
        </Marker>
        {students.map((student) => <Marker key={student.id} position={[student.latitude, student.longitude]} icon={studentIcon(student.photo, student.name)}>
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

export function VehicleTrackingMap({ vehicles, routes }) {
  const [now, setNow] = useState(() => Date.now())
  const [roadPaths, setRoadPaths] = useState({})

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 250)
    return () => window.clearInterval(interval)
  }, [])

  const journeys = useMemo(() => vehicles.filter((vehicle) => vehicle.status === 'Em serviço').map((vehicle) => {
    const route = routes.find((item) => item.name === vehicle.routeName)
    const fallback = vehicleTracks[vehicle.id] || vehicleTracks[route?.vehicleId] || [schoolLocation]
    return { vehicle, route, fallback }
  }), [vehicles, routes])

  useEffect(() => {
    let active = true
    Promise.all(journeys.map(async ({ vehicle, route, fallback }) => {
      if (!route) return [vehicle.id, fallback]
      try {
        return [vehicle.id, await fetchRoadPath(fallback)]
      } catch {
        return [vehicle.id, fallback]
      }
    })).then((entries) => {
      if (active) setRoadPaths(Object.fromEntries(entries))
    })
    return () => { active = false }
  }, [journeys])

  const trackedVehicles = vehicles.map((vehicle, index) => {
    const route = routes.find((item) => item.name === vehicle.routeName) || routes[index % routes.length]
    const fallback = vehicleTracks[vehicle.id] || vehicleTracks[route?.vehicleId] || [schoolLocation]
    const track = roadPaths[vehicle.id] || fallback
    const distanceOnTrack = routeLength(track)
    const distance = vehicle.status === 'Em serviço' && distanceOnTrack > 0 ? (now / 1000 * 8 + index * distanceOnTrack / vehicles.length) % distanceOnTrack : 0
    const location = positionOnRoute(track, distance)
    const heading = bearingOnRoute(track, distance)
    return { ...vehicle, location, route, track, heading }
  })
  const fleetBounds = useMemo(() => {
    const vehicleTracksInUse = vehicles.filter((vehicle) => vehicle.status === 'Em serviço').flatMap((vehicle, index) => {
      const route = routes.find((item) => item.name === vehicle.routeName) || routes[index % routes.length]
      return roadPaths[vehicle.id] || vehicleTracks[vehicle.id] || vehicleTracks[route?.vehicleId] || []
    })
    return [schoolLocation, ...vehicleTracksInUse]
  }, [vehicles, routes, roadPaths])

  return <section className="transport-map-section vehicle-tracking-section">
    <div className="transport-section-heading">
      <div><h2>Localização da frota</h2><p>Posição das viaturas e percursos em direcção à escola.</p></div>
      <div className="gps-demo-status"><span className="gps-live-dot" /> Simulação GPS ao vivo <small>actualizado às {new Date(now).toLocaleTimeString('pt-PT')}</small></div>
    </div>
    <div className="transport-map vehicle-tracking-map" aria-label="Mapa interactivo com a localização das viaturas">
      <MapContainer center={[-8.928, 13.205]} zoom={11} scrollWheelZoom className="transport-leaflet-map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapViewport positions={fleetBounds} />
        {trackedVehicles.filter((vehicle) => vehicle.status === 'Em serviço').map((vehicle) => <Polyline key={`track-${vehicle.id}`} positions={vehicle.track} className="transport-route-line" pathOptions={{ color: vehicle.route?.color || '#8b969b', weight: 4, opacity: 0.9, dashArray: '10 12' }} />)}
        <Marker position={schoolLocation} icon={schoolIcon}><Popup><strong>Complexo Escolar Fonte de Saber</strong><br />Destino da frota escolar</Popup></Marker>
        {trackedVehicles.map((vehicle) => <Marker key={vehicle.id} position={vehicle.location} icon={vehicleIcon(vehicle, vehicle.heading)}>
          <Popup><div className="transport-map-popup-content"><strong>{vehicle.id}</strong><span>{vehicle.model} · {vehicle.status}</span><span>Motorista: {vehicle.driver}</span><span>Rota: {vehicle.routeName}</span><small>{vehicle.status === 'Em serviço' ? 'Posição GPS simulada' : 'Viatura parada para manutenção'}</small></div></Popup>
        </Marker>)}
      </MapContainer>
      <div className="map-legend vehicle-map-legend"><span className="legend-school" /> Escola <span className="legend-vehicle" /> Viaturas ({vehicles.length})</div>
    </div>
    <div className="vehicle-location-list">{trackedVehicles.map((vehicle) => <div className="vehicle-location-row" key={vehicle.id}><span className="vehicle-location-dot" style={{ background: vehicle.route?.color || '#8b969b' }} /><div><strong>{vehicle.id}</strong><small>{vehicle.routeName} · {vehicle.driver}</small></div><span className={`transport-status ${vehicle.status === 'Em serviço' ? 'status-active' : 'status-pending'}`}>{vehicle.status}</span></div>)}</div>
  </section>
}