import { useState } from 'react'
import { student as data } from './mockStudent'
import StudentSearch from '../../student/StudentSearch'
import StudentStats from '../../student/StudentStats'
import StudentTable from '../../student/StudentTable'
import PageBase from '../../layout/PageBase/PageBase'

export default function StudentPage() {
    const [search, setSearch] = useState("")

    const filtered = data.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    )
    return (
        <PageBase title="Dados Geral" subtitle="Dos alunos">
            <StudentSearch search={search} setSearch={setSearch} />
            <StudentStats student={filtered} />
            <StudentTable student={filtered} />
        </PageBase>
    )
}