import { useState } from 'react';
import AcademicYearTable from '../../academicYear/AcademicYearTable';
import AcademicYearFormModal from '../../academicYear/AcademicYearFormModal';
import AcademicYearViewModal from '../../academicYear/AcademicYearViewModal';
import PageBase from '../../layout/PageBase/PageBase';

export default function AcademicYearPage() {
    const [years, setYears] = useState([
        {
            id: 1,
            year: "2020/2021",
            startDate: "2020-09-01",
            endDate: "2021-07-31",
            totalStudents: 318

        },
        {
            id: 2,
            year: "2021/2022",
            startDate: "2021-08-30",
            endDate: "2022-06-30",
            totalStudents: 784
        }]);
    const [selected, setSelected] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [showView, setShowView] = useState(false);

    function handleCreate(data) {
        const newYear = {
            id: Date.now(),
            ...data,
            totalStudents: 0
        }
        setYears(prev => [...prev, newYear]);
        setShowForm(false);
    }
    function handleDelete(id) {
        setYears(prev => prev.filter(year => year.id !== id));
    }
    return (
        <PageBase title="Ano Lectivo">
            <div className="card shadow-sm">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                        <div className='btn-group'>
                            <button className="btn btn-primary me-2" onClick={() => setShowForm(true)}>Novo Ano</button>
                            <button className="btn btn-secondary" >Editar</button>
                        </div>
                    </div>
                    <AcademicYearTable years={years} onView={(year) => {
                        setSelected(year);
                        setShowView(true);
                    }} onDelete={handleDelete} />
                    {showForm && (<AcademicYearFormModal onClose={() => setShowForm(false)} onSave={handleCreate} />
                    )}
                    {showView && selected && (<AcademicYearViewModal data={selected} onClose={() => setShowView(false)} />
                    )}
                </div>
            </div>
        </PageBase>
    )
}