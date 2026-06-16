import { useState, useEffect } from 'react';
import  DataTable  from '../../table/DataTable';
import AdvancedFilters from '../../filters/AdvancedFilters';
{/*import ExportButtons from '../../export/ExportButtons';*/}

export default function StudentsList() {
    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({});
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchStudents();
    }, [search, filters, currentPage]);

    function fetchStudents() {
        //Aqui depois vai se conectar com a API, por enquanto só loga com os parâmetros
        console.log("Buscar dados com:", search, filters, currentPage);
    }
    return (
        <div className="card shadow-sm">
            <div className="card-body"> 
                {/* A busca será feita aqui */}
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
                <DataTable data={students} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
        </div>
    );
}