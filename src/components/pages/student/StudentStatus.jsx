import React from "react";
import PageBase from "@/layout/PageBase/PageBase"

const StudentStatus = () => {
  const students = [
    { id: 887, name: "Alice Claudete Maiala Pedro", status: "N/Concluído" },
    { id: 942, name: "Alíria Tchissola Sassoquele Ricardo", status: "N/Concluído" },
    { id: 888, name: "Asael Matias Maiala Pedro", status: "N/Concluído" },
    { id: 957, name: "Cassandra Janaina Sungules Cassandra", status: "N/Concluído" },
    { id: 1143, name: "Daniel Alexandre Ulo Alfredo", status: "N/Concluído" },
  ];

  return (
    <PageBase title="Transição de Classe">
      <div className="container-fluid py-4 px-5" style={{ background: "#f4f6fb" }}>

        {/* TÍTULO */}
        <div className="mb-4">
          <h4 className="fw-semibold mb-1">
            Situação pedagógica dos alunos
          </h4>
          <div style={{ width: "55px", height: "3px", background: "#0d6efd" }}></div>
        </div>

        <div className="row g-4">

          {/* ================= LEFT CARD ================= */}
          <div className="col-md-3">
            <div
              className="p-4"
              style={{
                background: "#fff",
                borderRadius: "14px",
                border: "1px solid #eee",
                padding: "15px",
              }}
            >
              <h5 className="fw-semibold mb-3">
                Dados da classe
                <div style={{ width: "40px", height: "3px", background: "#0d6efd", marginTop: "4px", padding: "10px" }}></div>
              </h5>

              <label className="small mb-1">Ano lectivo:</label>
              <select className="form-select mb-3">
                <option>2025/2026</option>
              </select>
              <br />
              <br />

              <label className="small mb-1">Curso:</label>
              <br />
              <select className="form-select mb-3">
                <option>Sem Opção</option>
              </select>
              <br />
              <br />


              <label className="small mb-1">Classe:</label>
              <br />
              <select className="form-select mb-3">
                <option>1ª Classe</option>
                <br />
              </select>~
              <br />
              <br />


              <label className="small mb-1">Turma:</label>
              <br />
              <select className="form-select mb-3">
                <option>1M/A</option>
                <br />
              </select>
              <br />
              <br />


              <p className="small text-muted mb-3" style={{ fontSize: "12px" }}>
                Turma pertencente ao período: Manhã <br />
                Capacidade máxima de Alunos: 45
              </p>

              <button
                className="btn w-100"
                style={{
                  background: "#0d6efd",
                  color: "#fff",
                  borderRadius: "6px",
                  padding: "10px",
                  fontWeight: "500"
                }}
              >
                ✓ Buscar...
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="col-md-9">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

              <div
                style={{
                  background: "#fff",
                  borderRadius: "25px",
                  padding: "10px 25px",
                  border: "1px solid #eee",
                  fontSize: "13px",
                  gap: "25px"
                }}
              >
                <span><strong>Curso:</strong> Sem Opção</span>
                <br />
                <span><strong>Classe:</strong> 1ª Classe</span>
                <br />
                <span><strong>Turma:</strong> 1M/A</span>
                <br />
              </div>


            </div>

            {/* TABLE CARD */}
            <div
              style={{
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #eee",
                overflow: "hidden"
              }}
            >
              <div style={{ maxHeight: "420px", overflowY: "auto" }}>

                <table className="table mb-0">

                  <thead>
                    <tr style={{ background: "#0d6efd", color: "#fff" }}>
                      <th style={{ width: "80px" }}>ID</th>
                      <th>NOME</th>
                      <th>ESTADO</th>
                      <th>ACÇÃO</th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student, index) => (
                      <tr
                        key={student.id}
                        style={{
                          background: index === 0 ? "#0d6efd" : "#fff",
                          color: index === 0 ? "#fff" : "#000"
                        }}
                      >
                        <td>{student.id}</td>
                        <td>{student.name}</td>
                        <td
                          style={{
                            color: index === 0 ? "#fff" : "#ff4d4f",
                            fontWeight: "500"
                          }}
                        >
                          {student.status}
                        </td>
                        <td><button className="btn">ALTERAR ESTADO</button></td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            </div>

          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default StudentStatus;