import { useMemo, useState } from "react";
import PageBase from "../../layout/PageBase/PageBase";
import SuspensionHeader from "../../suspensao/SuspensionHeader";
import SuspensionTable from "../../suspensao/SuspensionTable";
import SuspensionForm from "../../suspensao/SuspensionForm";
import { useStudentStore } from "../../../stores/student.store";

export default function SuspensionPage() {
    const students = useStudentStore((state) => state.students);
    const suspendStudent = useStudentStore((state) => state.suspendStudent);
    const reinstateStudent = useStudentStore((state) => state.reinstateStudent);
    const [mode, setMode] = useState("activos");
    const [search, setSearch] = useState("");
    const [formOpen, setFormOpen] = useState(false);
    const activeCount = students.filter((student) => student.estado === "Activo").length;
    const suspendedCount = students.filter((student) => student.estado === "Suspenso").length;
    const filteredStudents = useMemo(() => students
        .filter((student) => student.estado === (mode === "activos" ? "Activo" : "Suspenso"))
        .filter((student) => `${student.name} ${student.registration} ${student.bi}`.toLowerCase().includes(search.toLowerCase())),
    [students, mode, search]);

    return (
        <PageBase title="Área de suspensão">
            <SuspensionHeader
                mode={mode}
                onModeChange={setMode}
                search={search}
                onSearchChange={setSearch}
                activeCount={activeCount}
                suspendedCount={suspendedCount}
                onOpenForm={() => setFormOpen(true)}
            />
            <SuspensionTable
                students={filteredStudents}
                mode={mode}
                onReinstate={reinstateStudent}
            />
            {formOpen && (
                <SuspensionForm
                    students={students.filter((student) => student.estado === "Activo")}
                    onClose={() => setFormOpen(false)}
                    onSubmit={(studentId, suspension) => {
                        suspendStudent(studentId, suspension);
                        setMode("suspensos");
                        setSearch("");
                        setFormOpen(false);
                    }}
                />
            )}
        </PageBase>
    )
}