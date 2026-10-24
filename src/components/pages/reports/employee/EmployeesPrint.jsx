import { useState } from "react"
import { useStaffStore } from "../../../../stores/staff.store"
import EmployeesHeader from "../../../reports/employee/EmployeesHeader"
import EmployeesTable from "../../../reports/employee/EmployeesTable"
import PageBase from "../@/layout/PageBase/PageBase"
export default function EmployeesPrint() {

  const [filter, setFilter] = useState("ativos")
  const employees = useStaffStore((state) => state.employees)

  const filteredData = employees.filter(emp => {
    if (filter === "ativos") return emp.status === "ativo"
    if (filter === "desativados") return emp.status === "desativado"
    return true
  })

  return (
    <PageBase title="Impressão da lista de Funcionários">
      <div className="container-fluid mt-4">

        <h2 className="text-center mb-4">
          <strong> Impressão da lista de Funcionários </strong>
          <br />

        </h2>
        <div style={{ backgroundColor: "blue", height: "4px", borderRadius: "10px", width: "100px", margin: "0px auto" }}></div>
        <EmployeesHeader
          total={filteredData.length}
          filter={filter}
          setFilter={setFilter}
        />

        <EmployeesTable data={filteredData} />

      </div>
    </PageBase>
  )
}
