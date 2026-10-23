export default function SuspensionTable({ students, mode, onReinstate }) {
    const isSuspended = mode === "suspensos";

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-content">
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Matrícula</th>
                                        <th>Aluno</th>
                                        <th>Classe / Turma</th>
                                        <th>{isSuspended ? "Motivo" : "Contacto"}</th>
                                        {isSuspended && <th>Data de retorno</th>}
                                        {isSuspended && <th>Acção</th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student) => (
                                        <tr key={student.id}>
                                            <td>{student.registration}</td>
                                            <td>{student.name}</td>
                                            <td>{student.classe} — {student.turma} ({student.periodo})</td>
                                            <td>{isSuspended ? student.suspension?.reason : student.contacto}</td>
                                            {isSuspended && <td>{student.suspension?.returnDate || "Por definir"}</td>}
                                            {isSuspended && (
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-xs btn-success"
                                                        onClick={() => onReinstate(student.id)}
                                                    >
                                                        Reintegrar
                                                    </button>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                    {students.length === 0 && (
                                        <tr>
                                            <td colSpan={isSuspended ? 6 : 4} className="text-center text-muted">
                                                {isSuspended ? "Nenhum aluno suspenso encontrado." : "Nenhum aluno activo encontrado."}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
