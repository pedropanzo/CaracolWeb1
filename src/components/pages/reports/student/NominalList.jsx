import { studentsMock } from "./StudentsData"

import NominalFilters from "../../../reports/NominalFilters"
import NominalTable from "../../../reports/NominalTable"
import PrintOptions from "../../../reports/PrintOptions"

import PageBase from "../@/layout/PageBase/PageBase"

export default function NominalList() {

  return (
    <PageBase title="Lista Nominal">
      <div className="container-fluid mt-4">

        <div className="row g-3">

          {/* ESQUERDA */}
          <div className="col-lg-3" style={{ padding: "5px" }}>
            <div className="row text-center" style={{ paddingBottom: "30px" }}>
              <div className="col-full ">
                <p>Modo de visualização</p>
              </div>
              <div className="col-md-6">
                <input type="radio" />Activos
              </div>
              <div className="col-md-6">
                <input type="radio" />Todos
              </div>
            </div>
            <NominalFilters />
          </div>

          {/* CENTRO */}
          <div className="col-lg-6">
            <NominalTable data={studentsMock} />
          </div>

          {/* DIREITA */}
          <div className="col-lg-3">
            <PrintOptions />
          </div>

        </div>

      </div>
    </PageBase>
  )
}
