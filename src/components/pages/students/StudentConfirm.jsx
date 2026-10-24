import { useState } from "react"
import StudentInfo from "../../Student/StudentInfo"
import AcademicHistory from "../../Student/AcademicHistory"
import StudentConfirmForm from "../../Student/StudentConfirmForm"
import { courses, classes, turmas } from "../../../data/students"
import { useStudentStore } from "../../../stores/student.store"
import PageBase from "../../layout/PageBase/PageBase"

export default function StudentConfirm() {
    const students = useStudentStore((state) => state.students)
    const confirmStudent = useStudentStore((state) => state.confirmStudent)
    const pendingStudents = students.filter((student) => student.estado === "Pendente")
    const [selectedId, setSelectedId] = useState(pendingStudents[0]?.id ?? "")
    const studentInfo = pendingStudents.find((student) => student.id === Number(selectedId))

    return (
        <PageBase title="Confirmação">

            <div className="container mt-4">
                <div className="form-group mb-3">
                    <label htmlFor="student-confirmation">Aluno aguardando confirmação</label>
                    <select
                        id="student-confirmation"
                        className="form-control"
                        value={selectedId}
                        onChange={(event) => setSelectedId(event.target.value)}
                    >
                        {pendingStudents.map((student) => (
                            <option key={student.id} value={student.id}>{student.name} — {student.registration}</option>
                        ))}
                    </select>
                </div>
                {!studentInfo && <div className="alert alert-info">Não há inscrições pendentes de confirmação.</div>}
                {studentInfo && (
                <div className="row">
                    <div className="col-md-5">
                        <StudentInfo student={studentInfo} />
                        <AcademicHistory history={studentInfo.history} />
                    </div>
                    <div className="col-md-7">
                        <StudentConfirmForm
                            courses={courses}
                            classes={classes}
                            turmas={turmas}
                            onConfirm={(academicData) => confirmStudent(studentInfo.id, academicData)}
                        />
                    </div>
                </div>
                )}
            </div>
        </PageBase>
    )
}
