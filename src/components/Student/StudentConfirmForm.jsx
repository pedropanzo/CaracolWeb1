import { useState } from "react"

export default function StudentConfirmForm({
    courses, classes, turmas, onConfirm
}){
    const [form, setForm] = useState({
        course: String(courses[0]?.id ?? ""),
        class: String(classes[0]?.id ?? ""),
        turma: String(turmas[0]?.id ?? ""),
        special: false
    })
    const handleChange = (e) => {
        const {name, value, type, checked } = e.target

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        })
    }
    const selectedTurma = turmas.find((t) => String(t.id) === form.turma)

    const handleSubmit = () => {
        const selectedCourse = courses.find((course) => String(course.id) === form.course)
        const selectedClass = classes.find((studentClass) => String(studentClass.id) === form.class)
        if (!selectedCourse || !selectedClass || !selectedTurma) return
        onConfirm?.({
            curso: selectedCourse.name,
            classe: selectedClass.name,
            turma: selectedTurma.name,
            periodo: selectedTurma.periodo,
        })
    }
    return (
        <div className="card p-3">
            <h6>Dados Académicos</h6>
            <div className="form-check mb-3">
                <input 
                    type="checkbox"
                    className="form-check-input"
                    name="special"
                    onChange={handleChange}
                />
                <label className="form-check-label">
                    Caso Especial
                </label>
            </div>
            <select 
                className="form-select mb-2"
                name="course"
                onChange={handleChange}
            >
                {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <select
                className="form-select mb-2"
                name="class"
                onChange={handleChange}
            >
                {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
            </select>
            <select 
                className="form-select md-2"
                name="turma"
                onChange={handleChange}
            >
                {turmas.map( t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                ))}
            </select>
            {selectedTurma && (
                <div className="mb-3 small text-muted">
                    <p>Período: {selectedTurma.periodo}</p>
                    <p>Capacidade: {selectedTurma.capacidade}</p>
                </div>
            )}
            <button
                className="btn btn-primary w-100"
                onClick={handleSubmit}
                disabled={!courses.length || !classes.length || !turmas.length}
            >
                Confirmar
            </button>
        </div>
    )
}