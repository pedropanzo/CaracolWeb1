import { useState, useEffect } from "react"
import { courses, classData } from "./mockClass"
import CourseFilter from "../../Classes/CourseFilter"
import ClassTable from "../../Classes/ClassTable"
import ClassModal from "../../Classes/ClassModal"
import TurmaModal from '../../Turma/TurmaModal'
import PageBase from "../../Layout/PageBase/PageBase"

export default function Classes() {
    const [selectedCourse, setSelectedCourse] = useState("")
    const [classes, setClasses] = useState(classData)
    const [showModal, setShowModal] = useState(false)
    const [showModalTurma, setShowModalTurma] = useState(true)
    const [editing, setEditing] = useState(null)

    useEffect(() => {
        console.log('showModalTurma changed:', showModalTurma);
    }, [showModalTurma])

    const filterClasses = classes.filter(
        c => c.courseId == selectedCourse
    )
    const addClass = (data) => {
        if (editing) {
            setClasses(classes.map(c => c.id === editing.id ? { ...editing, ...data } : c))
            setEditing(null)
        } else {
            const newClass = {
                id: Date.now(),
                courseId: Number(selectedCourse),
                ...data
            }
            setClasses([...classes, newClass])
        }
    }
    const deleteClass = (id) => {
        setClasses(classes.filter(c => c.id !== id))
    }
    return (
        <PageBase title="Classes">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <CourseFilter
                            courses={courses}
                            selected={selectedCourse}
                            onSelect={setSelectedCourse} />
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex justify-content-between mb-3">

                            <button
                                className="btn btn-primary"
                                onClick={() => setShowModal(true)}>Nova
                            </button>
                        </div>
                        <ClassTable
                            classes={filterClasses}
                            onEdit={(c) => {
                                setEditing(c)
                                setShowModal(true)
                            }}
                            onDelete={deleteClass} />
                    </div>
                </div>
                <ClassModal
                    key={editing?.id ?? "new"}
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={addClass}
                    editing={editing}
                />
                <TurmaModal
                    show={showModalTurma}
                    onClose={() => setShowModalTurma(false)}
                />
            </div>
        </PageBase>
    )
}