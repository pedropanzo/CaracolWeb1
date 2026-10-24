import { useState } from 'react'
import { useStudentStore } from '../../../stores/student.store'
import StudentSearch from '../../student/StudentSearch'
import StudentStats from '../../student/StudentStats'
import StudentTable from '../../student/StudentTable'
import PageBase from '@/layout/PageBase/PageBase'

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