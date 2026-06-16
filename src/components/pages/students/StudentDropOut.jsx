import { useState } from 'react'
import { student as data } from './mockStudent'
import StudentSearch from '../../student/StudentSearch'
import StudentStats from '../../student/StudentStats'
import StudentTable from '../../student/StudentTable'
import PageBase from '../../layout/PageBase/PageBase'

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