import React from "react";
import Header from "../../../reports/suspendedStudents/Header";
import Summary from "../../../reports/suspendedStudents/Summary";
import Actions from "../../../reports/suspendedStudents/Actions";
import Table from "../../../reports/suspendedStudents/Table";
import PageBase from "../../../layout/PageBase/PageBase";

const SuspendedStudentsPrint = () => {

  const students = [
    { id: 12, nome: "Francisco Capangue Justino Manuel", motivo: "duplicado" },
    { id: 16, nome: "Gabriel Coelho Bernardo", motivo: "erro de matrícula" },
    { id: 19, nome: "Adilson Ntala Matadidi", motivo: "matricula dupla" },
    { id: 28, nome: "Augusto Simão Fernandes", motivo: "MATRICULA DUPLA" },
    { id: 46, nome: "Gabriel Coelho Bernardo", motivo: "erro de matrícula" },
    { id: 47, nome: "Rucaia Bernardo de Oliveira", motivo: "matricula repetida" },
    { id: 48, nome: "Suzana João Paulino", motivo: "matricula repetida" },
    { id: 63, nome: "Carlos António Vieira Lucunde", motivo: "DESISTENTE" },
  ];

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