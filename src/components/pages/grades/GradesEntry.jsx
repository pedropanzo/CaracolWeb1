import { useState } from "react"
import { studentsMock } from "./gradesData"

import GradeFilters from "../../disciplines/DisciplineFilter"
import StudentsWithoutGrades from "../../grades/StudentsWithoutGrades"
import GradeFilterNotes from "../../grades/GradeEntryFilter"

import PageBase from "../../layout/PageBase/PageBase"

export default function GradesPage() {

  const [students, setStudents] = useState(studentsMock)
  const [selected, setSelected] = useState(null)

  const withoutGrades = students.filter(s => !s.notas)
  const withGrades = students.filter(s => s.notas)

  const handleSave = (id, notas) => {

    const updated = students.map(s =>
      s.id === id
        ? { ...s, notas }
        : s
    )

    setStudents(updated)
    setSelected(null)
  }

  return (
    <PageBase title="Notas dos Alunos Cujo as Classes não estam no sistema">
      <div className="container mt-4 row ">

        <div className="col-md-3 " style={{ backgroundColor: "white", padding: "10px", marginRight: "10px" }}>
          <h2 className="mb-3" style={{ fontWeight: "bold" }}>Classe Actual</h2>

          {/* FILTROS */}
          <GradeFilters />

        </div>

        <div className="col-md-5" style={{ backgroundColor: "white", padding: "10px", marginRight: "10px" }}>

          {/* Centro */}
          <div >
            <p className="text-center">Selecione o aluno desejado: </p>
            <StudentsWithoutGrades
              data={withoutGrades}
              onSelect={setSelected}
            />
          </div>

        </div>

        {/* DIREITA */}

        <div className="col-md-3" style={{ backgroundColor: "white", padding: "10px" }}>
          <p >... </p>
          <h2 className="mb-3" style={{ fontWeight: "bold" }}>Notas Para:</h2>
          <GradeFilterNotes />
        </div>

      </div>
    </PageBase>
  )
}
