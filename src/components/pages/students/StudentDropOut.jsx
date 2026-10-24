import { useState } from 'react'
import { useStudentStore } from '../../../stores/student.store'
import StudentSearch from '../../Student/StudentSearch'
import StudentStats from '../../Student/StudentStats'
import StudentTable from '../../Student/StudentTable'
import PageBase from '../../Layout/PageBase/PageBase'

export default function StudentDropOut() {
    const [search, setSearch] = useState("")
    const data = useStudentStore((state) => state.students)

    const desistentes = data.filter((s) =>
        (s.estado === "Desistente" || s.estado === "Desactivo")
        && `${s.name} ${s.registration}`.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <PageBase title="Alunos activos e Desistentes">
            <StudentSearch search={search} setSearch={setSearch} />
            <StudentTable student={desistentes} />
        </PageBase>
    )
}