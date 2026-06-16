// src/pages/student/PrintSuspendedStudents.jsx
import React from "react";
import SuspendedHeader from "../../student/SuspendedHeader";
import SuspendedTable from "../../student/SuspendedTable";
import { suspendedStudents } from "../../student/data/suspendedStudents";
import PageBase from "../../layout/PageBase/PageBase"

const PrintSuspendedStudents = () => {
  return (
    <PageBase title="Impressao pedagogica">
      <div className="container-fluid py-4" style={{ background: "#f4f6fb" }}>

        <SuspendedHeader total={suspendedStudents.length} />

        <SuspendedTable students={suspendedStudents} />

      </div>
    </PageBase>
  );
};

export default PrintSuspendedStudents;