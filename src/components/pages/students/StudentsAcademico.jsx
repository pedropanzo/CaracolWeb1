import { useMemo, useState } from "react"
import { useStudentStore } from "../../../stores/student.store"
import PageBase from "../../layout/PageBase/PageBase"

export default function StudentsAcademico() {
    const students = useStudentStore((state) => state.students)
    const [year, setYear] = useState("2025/2026")
    const [search, setSearch] = useState("")
    const filtered = useMemo(() => students.flatMap((student) => {
        const currentRecord = student.anoLectivo === year
            ? [{ ...student, recordYear: year }]
            : [];
        const previousRecords = student.history
            .filter((record) => record.ano === year)
            .map((record) => ({ ...student, ...record, recordYear: record.ano }));
        return [...currentRecord, ...previousRecords].filter((record) =>
            `${record.name} ${record.registration} ${record.turma}`.toLowerCase().includes(search.toLowerCase())
        );
    }), [students, year, search])

    return (
        <PageBase title="Dados Académicos">
            <div className="row">
                <div className="col-lg-3  pull-right">
                    <div className="widget style1 white-bg">
                        <div className="row">
                            <div className="col-xs-3 text-center line">
                                <i className="fa fa-user-circle fa-4x"></i>
                            </div>
                            <div className="col-xs-8 text-right">
                                <span> ALUNOS NO ANO LECTIVO</span>
                                <h2 className="font-bold line">{filtered.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-2">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <p>Filtrar dados académicos</p>
                        </div>
                        <div className="ibox-content">
                            <form role="form">
                                <div className="form-group">
                                    <label>Ano Lectivo</label>
                                    <select className="form-control" value={year} onChange={(event) => setYear(event.target.value)}>
                                        <option value="2025/2026">2025/2026</option>
                                        <option value="2024/2025">2024/2025</option>
                                    </select>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-10">
                    <div className="ibox float-e-margins">
                        <div className="ibox-content">
                            <div className="form-group">
                                <input
                                    type="search"
                                    className="form-control"
                                    placeholder="Pesquisar por nome, matrícula ou turma..."
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover dataTables-example" id="#TableFormatada">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>NOME</th>
                                            <th>CURSO</th>
                                            <th>CLASSE</th>
                                            <th>TURMA</th>
                                            <th>ANO LECTIVO</th>
                                            <th>INSCRIÇÃO</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.map((student) => (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.curso}</td>
                                                <td>{student.classe}</td>
                                                <td>{student.turma}</td>
                                                <td>{student.recordYear}</td>
                                                <td>{student.dataInscricao}</td>
                                            </tr>
                                        ))}
                                        {filtered.length === 0 && (
                                            <tr><td colSpan="7" className="text-center">Nenhum aluno encontrado para este ano lectivo.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="placeModalHere"></div>
        </PageBase>

    )

}