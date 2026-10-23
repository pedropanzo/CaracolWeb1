import { useAuth } from '../../../hooks/useAuth'
import DashboardGrid from '../../dashboard/DashboardGrid'
import { useStaffStore } from '../../../stores/staff.store'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const employees = useStaffStore((state) => state.employees)

  return (
    <div className="container-fluid" >

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-0">Caracol</h2>
          <small className="text-muted">
            Complexo Escolar Fonte de Saber
          </small>
          <small className="text-muted">
            Ano lectivo
          </small>
        </div>

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">
            Time
          </span>

        </div>
      </div>

      {/* CARDS DE ESTATÍSTICAS */}
      <div className="row g-4 mb-4">

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Alunos</h6>
              <h3 className="fw-bold">320</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Professores</h6>
              <h3 className="fw-bold">{employees.filter((employee) => employee.categoria === 'Professor').length}</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Turmas</h6>
              <h3 className="fw-bold">18</h3>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="text-muted">Funcionários</h6>
              <h3 className="fw-bold">{employees.length}</h3>
            </div>
          </div>
        </div>

      </div>

      {/* GRID DE WIDGETS */}
      <DashboardGrid />
      <footer className="bg-white border-top px-4 pt-4 d-flex justify-content-between align-items-center ">
       Caracol@2026
     </footer>
    </div>
    
  )
}
