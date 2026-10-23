import { useState } from "react";

export default function SuspensionForm({ students, onClose, onSubmit }) {
    const [form, setForm] = useState({
        studentId: String(students[0]?.id ?? ""),
        reason: "",
        details: "",
        date: new Date().toISOString().slice(0, 10),
        returnDate: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedStudent = students.find((student) => String(student.id) === form.studentId);
        if (!selectedStudent || !form.reason.trim()) return;
        onSubmit(selectedStudent.id, {
            reason: form.reason,
            details: form.details.trim(),
            date: form.date,
            returnDate: form.returnDate,
        });
    };

    return (
        <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="suspension-form-title"
            style={{ display: "block", background: "rgba(0,0,0,.45)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <button type="button" className="close" aria-label="Fechar" onClick={onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title" id="suspension-form-title">Registar suspensão</h4>
                            <p className="text-muted">Selecione o aluno e descreva o motivo para manter o histórico académico actualizado.</p>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="suspension-student">Aluno activo</label>
                                <select
                                    id="suspension-student"
                                    className="form-control"
                                    value={form.studentId}
                                    onChange={(event) => setForm({ ...form, studentId: event.target.value })}
                                    required
                                >
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.name} — {student.registration}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="suspension-reason">Motivo</label>
                                <select
                                    id="suspension-reason"
                                    className="form-control"
                                    value={form.reason}
                                    onChange={(event) => setForm({ ...form, reason: event.target.value })}
                                    required
                                >
                                    <option value="">Seleccione o motivo</option>
                                    <option>Falta de documentação</option>
                                    <option>Matrícula duplicada</option>
                                    <option>Incumprimento do regulamento</option>
                                    <option>Pedido do encarregado</option>
                                    <option>Outro</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="suspension-details">Observações</label>
                                <textarea
                                    id="suspension-details"
                                    className="form-control"
                                    rows="3"
                                    value={form.details}
                                    onChange={(event) => setForm({ ...form, details: event.target.value })}
                                    placeholder="Registe informações úteis para a secretaria."
                                />
                            </div>
                            <div className="row">
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="suspension-date">Data da suspensão</label>
                                    <input
                                        id="suspension-date"
                                        type="date"
                                        className="form-control"
                                        value={form.date}
                                        onChange={(event) => setForm({ ...form, date: event.target.value })}
                                        required
                                    />
                                </div>
                                <div className="col-sm-6 form-group">
                                    <label htmlFor="suspension-return-date">Data prevista de retorno</label>
                                    <input
                                        id="suspension-return-date"
                                        type="date"
                                        className="form-control"
                                        min={form.date}
                                        value={form.returnDate}
                                        onChange={(event) => setForm({ ...form, returnDate: event.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={onClose}>Cancelar</button>
                            <button type="submit" className="btn btn-danger" disabled={!students.length}>
                                Confirmar suspensão
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
