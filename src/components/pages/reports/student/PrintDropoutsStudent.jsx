import { useState } from "react"
import { dropoutsMock } from "./dropoutsMock"
import DropoutTable from "../../../Student/dropouts/DropoutTable"
import NominalFilters from '../../../reports/NominalFilters'
import DropoutTable2 from '../../../Student/dropouts/DropoutTable'
import PageBase from "../@/layout/PageBase/PageBase"

export default function PrintDropoutsStudent() {

  const [data, setData] = useState(dropoutsMock)
  const [showModal, setShowModal] = useState(false)

  const handleSave = (novo) => {
    const newData = {
      id: Date.now(),
      ...novo,
      data: new Date().toLocaleDateString()
    }

    setData([...data, newData])
  }

  return (
    <PageBase title="Alunos Desistentes" >
      <div className="container-fluid mt-4">
        <div className="row g-3">
          <div className="col-lg-3" style={{ backgroundColor: "white", padding: "10px", marginRight: "10px" }}>
            <NominalFilters />
          </div>
          <div className="col-lg-8">
            <DropoutTable data={data} />
          </div>

        </div>
      </div>
    </PageBase>
  )
}
