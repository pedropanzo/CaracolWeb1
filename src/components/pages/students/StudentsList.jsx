import { useMemo, useState } from 'react';
import DataTable from '../../Table/DataTable';
import AdvancedFilters from '../../filters/AdvancedFilters';
import PageBase from '@/layout/PageBase/PageBase';
import { useStudentStore } from '../../../stores/student.store';
{/*import ExportButtons from '../../export/ExportButtons';*/}

export default function StudentsList() {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const students = useStudentStore((state) => state.students);

    const filteredStudents = useMemo(() => students.filter((student) => (
        `${student.name} ${student.registration} ${student.turma}`.toLowerCase().includes(search.toLowerCase())
        && (!filters.status || student.estado === filters.status)
        && (!filters.periodo || student.periodo.toLowerCase() === filters.periodo.toLowerCase())
    )), [students, search, filters]);
    return (
        <PageBase title="Inscrições de alunos">
        <div className="card shadow-sm">
            <div className="card-body"> 
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <input 
                        type="text"
                        className="form-control w-50"
                        placeholder="Buscar por nome, email ou matrícula ou turma..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
               {/*     <ExportButtons data={students} /> */}
                </div>
                {/* Filtros avançados */}
                <AdvancedFilters onChange={setFilters} />
                {/* Tabela de dados */}
                <DataTable
                    data={filteredStudents}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
        </PageBase>
    );
}