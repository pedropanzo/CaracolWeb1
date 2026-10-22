const STORAGE_KEY = 'caracol-transport-demo-v1'

export const initialTransportData = {
  passengers: [
    { id: 'AL-2041', name: 'Amélia Domingos', className: '8.ª A', route: 'Kilamba · Centro', guardian: 'Rosa Domingos', phone: '+244 923 410 281', address: 'Nova Vida, Rua 12', status: 'Activo', latitude: -8.889, longitude: 13.211 },
    { id: 'AL-2037', name: 'Bento Manuel', className: '7.ª B', route: 'Kilamba · Centro', guardian: 'Paulo Manuel', phone: '+244 924 120 337', address: 'Camama, Av. Principal', status: 'Activo', latitude: -8.916, longitude: 13.247 },
    { id: 'AL-1988', name: 'Carla Sebastião', className: '9.ª C', route: 'Talatona · Centro', guardian: 'Lúcia Sebastião', phone: '+244 923 552 198', address: 'Talatona, Condomínio 7', status: 'Activo', latitude: -8.925, longitude: 13.183 },
    { id: 'AL-2114', name: 'Dário António', className: '6.ª A', route: 'Benfica · Centro', guardian: 'Marta António', phone: '+244 926 301 114', address: 'Benfica, Rua da Samba', status: 'Pendente', latitude: -8.976, longitude: 13.164 },
    { id: 'AL-2059', name: 'Elisa Francisco', className: '8.ª B', route: 'Talatona · Centro', guardian: 'João Francisco', phone: '+244 923 801 059', address: 'Morro Bento, Rua 4', status: 'Activo', latitude: -8.859, longitude: 13.229 },
    { id: 'AL-1926', name: 'Filipe André', className: '10.ª A', route: 'Kilamba · Centro', guardian: 'Ana André', phone: '+244 925 719 026', address: 'Kilamba, Bloco C', status: 'Activo', latitude: -8.941, longitude: 13.278 },
    { id: 'AL-2160', name: 'Graça Miguel', className: '5.ª C', route: 'Benfica · Centro', guardian: 'Mário Miguel', phone: '+244 924 611 160', address: 'Benfica, Bairro Azul', status: 'Pendente', latitude: -8.948, longitude: 13.145 },
    { id: 'AL-1873', name: 'Hugo Mateus', className: '11.ª B', route: 'Talatona · Centro', guardian: 'Isabel Mateus', phone: '+244 923 771 873', address: 'Patriota, Rua 8', status: 'Activo', latitude: -8.829, longitude: 13.267 },
  ],
  routes: [
    { id: 'RT-01', name: 'Kilamba · Centro', origin: 'Kilamba', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-42-18-AB', driver: 'Manuel Joaquim', departure: '06:20', status: 'Em curso', color: '#087f8c' },
    { id: 'RT-02', name: 'Talatona · Centro', origin: 'Talatona', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-19-63-CD', driver: 'Teresa Paulo', departure: '06:35', status: 'Em curso', color: '#e28a32' },
    { id: 'RT-03', name: 'Benfica · Centro', origin: 'Benfica', destination: 'Complexo Escolar Fonte de Saber', vehicleId: 'LD-88-04-EF', driver: 'José António', departure: '06:10', status: 'Programada', color: '#3973b9' },
  ],
  vehicles: [
    { id: 'LD-42-18-AB', model: 'Toyota Coaster', capacity: 29, driver: 'Manuel Joaquim', phone: '+244 923 400 182', inspection: '2026-12-18', status: 'Em serviço' },
    { id: 'LD-19-63-CD', model: 'Hyundai County', capacity: 25, driver: 'Teresa Paulo', phone: '+244 924 310 963', inspection: '2027-01-09', status: 'Em serviço' },
    { id: 'LD-88-04-EF', model: 'Toyota Hiace', capacity: 15, driver: 'José António', phone: '+244 925 220 804', inspection: '2026-11-27', status: 'Em serviço' },
    { id: 'LD-31-55-GH', model: 'Mitsubishi Rosa', capacity: 29, driver: 'Mário Pedro', phone: '+244 923 710 155', inspection: '2026-10-30', status: 'Manutenção' },
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
    return saved ? { ...initialTransportData, ...JSON.parse(saved) } : initialTransportData
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