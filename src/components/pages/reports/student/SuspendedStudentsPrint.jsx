import React from "react";
import Header from "../../../reports/suspendedStudents/Header";
import Summary from "../../../reports/suspendedStudents/Summary";
import Actions from "../../../reports/suspendedStudents/Actions";
import Table from "../../../reports/suspendedStudents/Table";
import PageBase from "../../../Layout/PageBase/PageBase";
import { useStudentStore } from "../../../../stores/student.store";

const SuspendedStudentsPrint = () => {
  const students = useStudentStore((state) => state.students)
    .filter((student) => student.estado === "Suspenso");

  const handlePrint = () => window.print();

  return (
    <PageBase title="Impressão da lista de Alunos suspensos">
      <div className="container py-4">

        <Header />

        <div className=" row d-flex justify-content-center align-items-center gap-4 mb-4 flex-wrap" style={{ width: "50%", margin: "0px auto", padding: "10px", textAlign: "center" }}>
          <div className="col-lg-6">
            <Summary total={students.length} />
          </div>
          <div className="col-lg-6">
            <Actions onPrint={handlePrint} />
          </div>
        </div>

        <Table students={students} />

      </div>
    </PageBase>
  );
};

export default SuspendedStudentsPrint;