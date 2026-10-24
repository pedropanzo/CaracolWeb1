import { useState } from "react"

import { classHistoryMock } from "./classHistoryMock"

import ClassHistoryHeader from "../../../reports/class/ClassHistoryHeader"
import ClassHistoryTable from "../../../reports/class/ClassHistoryTable"
import PageBase from "../@/layout/PageBase/PageBase"

export default function ClassHistoryReport() {

  const [year, setYear] = useState("2025/2026")

  const filteredData = classHistoryMock.filter(
    item => item.ano === year
  )

  return (
    <PageBase title="Impressão do histórico de turmas criadas">
      <div className="container-fluid mt-4">

        {/* TÍTULO */}
        <h2 className="text-center fw-bold mb-4">
          <strong> Impressão do histórico de turmas criadas </strong>
          <br />
        </h2>
        <div style={{ backgroundColor: "blue", height: "4px", borderRadius: "10px", width: "100px", margin: "0px auto" }}></div>
        {/* HEADER */}
        <ClassHistoryHeader
          total={filteredData.length}
          year={year}
          setYear={setYear}
        />

        {/* TABELA */}
        <ClassHistoryTable data={filteredData} />

      </div>
    </PageBase>
  )
}
