import { useState } from 'react';
import DepartmentForm from './DepartmentForm';
import { mockDepartments } from './mockDepartments';
import PageBase from '@/layout/PageBase/PageBase';

export default function DepartmentsList() {
    const [departments, setDepartments] = useState(mockDepartments);
    const [showModal, setShowModal] = useState(false);

    const handleCreate = (data) => {
        const newDepartment = {
            id: departments.length + 1,
            ...data,
            totalCursos: 0
        };
        setDepartments([...departments, newDepartment]);
    };
    return (
        <PageBase title="Departamento">
            <div className="card shadow-sm">
                <div className='card-body'>
                    <div className="d-flex justify-content-between mb-3">
                        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
                            Novo Departamento
                        </button>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead >
                                <tr>
                                    <th>Departamento</th>
                                    <th>Cabeçalho</th>
                                    <th>Dr. Pedagógico</th>
                                    <th>Dr. Geral</th>
                                    <th>Total de Cursos</th>
                                    <th>Acções</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map(dep => (
                                    <tr key={dep.id}>
                                        <td>{dep.name}</td>
                                        <td>{dep.cabecalho}</td>
                                        <td>{dep.directorPedagogico}</td>
                                        <td>{dep.directorGeneral}</td>
                                        <td>{dep.totalCursos}</td>
                                        <td>
                                            <button className="btn btn-sm btn-info me-2" onClick={() => onView(dep)}>Ver</button>
                                            <button className="btn btn-sm btn-danger" onClick={() => onDelete(dep.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <DepartmentForm
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleCreate}
                />
            </div>
        </PageBase>
    )
}