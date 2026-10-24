// src/pages/student/PrintSuspendedStudents.jsx
import React from "react";
import SuspendedHeader from "../../Student/SuspendedHeader";
import SuspendedTable from "../../Student/SuspendedTable";
import { useStudentStore } from "../../../stores/student.store";
import PageBase from "../../Layout/PageBase/PageBase"

const PrintSuspendedStudents = () => {
  const students = useStudentStore((state) => state.students)
    .filter((student) => student.estado === "Suspenso");
  return (
    <PageBase title="Impressao pedagogica">
      <div className="container-fluid py-4" style={{ background: "#f4f6fb" }}>

        <SuspendedHeader total={students.length} />

        <SuspendedTable students={students} />

      </div>
    </PageBase>
  );
};

export default PrintSuspendedStudents;