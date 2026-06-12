import { useState } from 'react'
import { student as data } from './mockStudent'
import StudentSearch from '../../Student/StudentSearch'
import StudentStats from '../../Student/StudentStats'
import StudentTable from '../../Student/StudentTable'
import PageBase from '../../Layout/PageBase/PageBase'

export default function StudentDropOut() {
    const [search, setSearch] = useState("")

    const desistentes = data.filter(s => s.estado === "Desactivo" || s.estado === "Desistente")

    return (
        <PageBase title="Alunos activos e Desistentes">
            <StudentSearch search={search} setSearch={setSearch} />
            <StudentTable student={desistentes} />
        </PageBase>
    )
}