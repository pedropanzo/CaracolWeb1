const STORAGE_KEY = 'caracol-transport-demo-v2'

export const initialTransportData = {
  passengers: [
    { id: 'AL-2041', name: 'Amélia Domingos', className: '8.ª A', route: 'Kilamba · Centro', guardian: 'Rosa Domingos', phone: '+244 923 410 281', address: 'Nova Vida, Rua 12', status: 'Activo', latitude: -8.889, longitude: 13.211, photo: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { id: 'AL-2037', name: 'Bento Manuel', className: '7.ª B', route: 'Kilamba · Centro', guardian: 'Paulo Manuel', phone: '+244 924 120 337', address: 'Camama, Av. Principal', status: 'Activo', latitude: -8.916, longitude: 13.247, photo: 'https://randomuser.me/api/portraits/men/41.jpg' },
    { id: 'AL-1988', name: 'Carla Sebastião', className: '9.ª C', route: 'Talatona · Centro', guardian: 'Lúcia Sebastião', phone: '+244 923 552 198', address: 'Talatona, Condomínio 7', status: 'Activo', latitude: -8.925, longitude: 13.183, photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 'AL-2114', name: 'Dário António', className: '6.ª A', route: 'Benfica · Centro', guardian: 'Marta António', phone: '+244 926 301 114', address: 'Benfica, Rua da Samba', status: 'Pendente', latitude: -8.976, longitude: 13.164, photo: 'https://randomuser.me/api/portraits/men/51.jpg' },
    { id: 'AL-2059', name: 'Elisa Francisco', className: '8.ª B', route: 'Talatona · Centro', guardian: 'João Francisco', phone: '+244 923 801 059', address: 'Morro Bento, Rua 4', status: 'Activo', latitude: -8.859, longitude: 13.229, photo: 'https://randomuser.me/api/portraits/women/25.jpg' },
    { id: 'AL-1926', name: 'Filipe André', className: '10.ª A', route: 'Kilamba · Centro', guardian: 'Ana André', phone: '+244 925 719 026', address: 'Kilamba, Bloco C', status: 'Activo', latitude: -8.941, longitude: 13.278, photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 'AL-2160', name: 'Graça Miguel', className: '5.ª C', route: 'Benfica · Centro', guardian: 'Mário Miguel', phone: '+244 924 611 160', address: 'Benfica, Bairro Azul', status: 'Pendente', latitude: -8.948, longitude: 13.145, photo: 'https://randomuser.me/api/portraits/women/58.jpg' },
    { id: 'AL-1873', name: 'Hugo Mateus', className: '11.ª B', route: 'Talatona · Centro', guardian: 'Isabel Mateus', phone: '+244 923 771 873', address: 'Patriota, Rua 8', status: 'Activo', latitude: -8.829, longitude: 13.267, photo: 'https://randomuser.me/api/portraits/men/64.jpg' },
    { id: 'AL-2201', name: 'Íris Joaquim', className: '6.ª B', route: 'Kilamba · Centro', guardian: 'Madalena Joaquim', phone: '+244 923 602 201', address: 'Kilamba, Bloco D', status: 'Activo', latitude: -8.957, longitude: 13.265, photo: 'https://randomuser.me/api/portraits/women/61.jpg' },
    { id: 'AL-2202', name: 'Joel Pedro', className: '9.ª A', route: 'Kilamba · Centro', guardian: 'Rui Pedro', phone: '+244 924 802 202', address: 'Camama, Rua do Kikuxi', status: 'Activo', latitude: -8.934, longitude: 13.291, photo: 'https://randomuser.me/api/portraits/men/73.jpg' },
    { id: 'AL-2203', name: 'Kátia Manuel', className: '7.ª C', route: 'Kilamba · Centro', guardian: 'Lídia Manuel', phone: '+244 925 180 203', address: 'Nova Vida, Rua 8', status: 'Activo', latitude: -8.907, longitude: 13.192, photo: 'https://randomuser.me/api/portraits/women/71.jpg' },
    { id: 'AL-2204', name: 'Lourenço Paulo', className: '10.ª C', route: 'Kilamba · Centro', guardian: 'Sónia Paulo', phone: '+244 926 440 204', address: 'Kilamba, Bloco A', status: 'Activo', latitude: -8.971, longitude: 13.239, photo: 'https://randomuser.me/api/portraits/men/84.jpg' },
    { id: 'AL-2205', name: 'Marta Cassoma', className: '5.ª A', route: 'Talatona · Centro', guardian: 'Mateus Cassoma', phone: '+244 923 340 205', address: 'Talatona, Rua do Patriota', status: 'Activo', latitude: -8.872, longitude: 13.196, photo: 'https://randomuser.me/api/portraits/women/16.jpg' },
    { id: 'AL-2206', name: 'Nelson Chissola', className: '8.ª C', route: 'Talatona · Centro', guardian: 'Luísa Chissola', phone: '+244 924 520 206', address: 'Morro Bento, Bairro 4', status: 'Activo', latitude: -8.891, longitude: 13.171, photo: 'https://randomuser.me/api/portraits/men/27.jpg' },
    { id: 'AL-2207', name: 'Olga Francisco', className: '11.ª A', route: 'Talatona · Centro', guardian: 'Carlos Francisco', phone: '+244 925 790 207', address: 'Talatona, Condomínio Horizonte', status: 'Activo', latitude: -8.844, longitude: 13.241, photo: 'https://randomuser.me/api/portraits/women/81.jpg' },
    { id: 'AL-2208', name: 'Paulo Domingos', className: '6.ª C', route: 'Talatona · Centro', guardian: 'Rosa Domingos', phone: '+244 926 110 208', address: 'Benfica, Rua da Samba', status: 'Activo', latitude: -8.951, longitude: 13.194, photo: 'https://randomuser.me/api/portraits/men/90.jpg' },
    { id: 'AL-2209', name: 'Quitéria André', className: '7.ª A', route: 'Benfica · Centro', guardian: 'José André', phone: '+244 923 900 209', address: 'Benfica, Bairro Azul', status: 'Activo', latitude: -8.962, longitude: 13.138, photo: 'https://randomuser.me/api/portraits/women/39.jpg' },
    { id: 'AL-2210', name: 'Rafael Miguel', className: '9.ª B', route: 'Benfica · Centro', guardian: 'Ana Miguel', phone: '+244 924 750 210', address: 'Benfica, Rua 11', status: 'Activo', latitude: -8.982, longitude: 13.185, photo: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 'AL-2211', name: 'Sílvia António', className: '5.ª B', route: 'Benfica · Centro', guardian: 'Manuel António', phone: '+244 925 640 211', address: 'Ramiros, Estrada Principal', status: 'Activo', latitude: -8.993, longitude: 13.126, photo: 'https://randomuser.me/api/portraits/women/93.jpg' },
    { id: 'AL-2212', name: 'Tomás Sebastião', className: '10.ª B', route: 'Benfica · Centro', guardian: 'Fátima Sebastião', phone: '+244 926 570 212', address: 'Benfica, Zona Verde', status: 'Activo', latitude: -8.931, longitude: 13.153, photo: 'https://randomuser.me/api/portraits/men/12.jpg' },
  ],
  routes: [
    { id: 'RT-01', name: 'Kilamba · Centro', origin: 'Kilamba', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-42-18-AB', driver: 'Manuel Joaquim', departure: '06:20', status: 'Em curso', color: '#007AF0' },
    { id: 'RT-02', name: 'Talatona · Centro', origin: 'Talatona', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-19-63-CD', driver: 'Teresa Paulo', departure: '06:35', status: 'Em curso', color: '#e28a32' },
    { id: 'RT-03', name: 'Benfica · Centro', origin: 'Benfica', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-88-04-EF', driver: 'José António', departure: '06:10', status: 'Programada', color: '#3973b9' },
  ],
  vehicles: [
    { id: 'LD-42-18-AB', model: 'Toyota Coaster', capacity: 29, driver: 'Manuel Joaquim', phone: '+244 923 400 182', inspection: '2026-12-18', status: 'Em serviço', routeName: 'Kilamba · Centro' },
    { id: 'LD-19-63-CD', model: 'Hyundai County', capacity: 25, driver: 'Teresa Paulo', phone: '+244 924 310 963', inspection: '2027-01-09', status: 'Em serviço', routeName: 'Talatona · Centro' },
    { id: 'LD-88-04-EF', model: 'Toyota Hiace', capacity: 15, driver: 'José António', phone: '+244 925 220 804', inspection: '2026-11-27', status: 'Em serviço', routeName: 'Benfica · Centro' },
    { id: 'LD-31-55-GH', model: 'Mitsubishi Rosa', capacity: 29, driver: 'Mário Pedro', phone: '+244 923 710 155', inspection: '2026-10-30', status: 'Manutenção', routeName: 'Parque escolar' },
    { id: 'LD-73-20-JK', model: 'Nissan Serena', capacity: 8, driver: 'Adriano Miguel', phone: '+244 923 250 720', inspection: '2027-02-12', status: 'Em serviço', routeName: 'Talatona · Centro' },
  ],
  payments: [
    { id: 'PG-4101', passengerId: 'AL-2041', passenger: 'Amélia Domingos', month: 'Outubro', amount: 18500, dueDate: '2026-10-10', status: 'Pago' },
    { id: 'PG-4102', passengerId: 'AL-2037', passenger: 'Bento Manuel', month: 'Outubro', amount: 18500, dueDate: '2026-10-10', status: 'Pago' },
    { id: 'PG-4103', passengerId: 'AL-1988', passenger: 'Carla Sebastião', month: 'Outubro', amount: 22000, dueDate: '2026-10-10', status: 'Pendente' },
    { id: 'PG-4104', passengerId: 'AL-2114', passenger: 'Dário António', month: 'Outubro', amount: 16000, dueDate: '2026-10-10', status: 'Pendente' },
    { id: 'PG-4105', passengerId: 'AL-2059', passenger: 'Elisa Francisco', month: 'Outubro', amount: 22000, dueDate: '2026-10-10', status: 'Pago' },
    { id: 'PG-4106', passengerId: 'AL-1926', passenger: 'Filipe André', month: 'Outubro', amount: 18500, dueDate: '2026-10-10', status: 'Pago' },
  ],
  costs: [
    { id: 'CT-1101', category: 'Combustível', vehicleId: 'LD-42-18-AB', description: 'Abastecimento semanal', date: '2026-10-20', amount: 84500 },
    { id: 'CT-1102', category: 'Manutenção', vehicleId: 'LD-31-55-GH', description: 'Revisão do sistema de travagem', date: '2026-10-18', amount: 125000 },
    { id: 'CT-1103', category: 'Combustível', vehicleId: 'LD-19-63-CD', description: 'Abastecimento semanal', date: '2026-10-17', amount: 72000 },
  ],
}

export function loadTransportData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialTransportData
    const parsed = JSON.parse(saved)
    const savedVehicles = parsed.vehicles || []
    const vehicles = [
      ...initialTransportData.vehicles.filter((vehicle) => !savedVehicles.some((savedVehicle) => savedVehicle.id === vehicle.id)),
      ...savedVehicles,
    ]
    return { ...initialTransportData, ...parsed, vehicles }
  } catch {
    return initialTransportData
  }
}

export function saveTransportData(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage can be unavailable in private browsing; the in-memory demo still works.
  }
}