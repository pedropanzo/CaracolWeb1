import React from "react";
import PageBase from "../../../Layout/PageBase/PageBase";


const TransferredNotes = () => {
  return (
     <PageBase title="Notas transferidas">
    <div className="container-fluid mt-3">

      {/* Título */}
      <h4 className="fw-bold border-bottom border-primary pb-1 mb-3">
        Notas dos Alunos transferidos
      </h4>

      <div className="row">

        {/* ================= LEFT (FILTROS) ================= */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">

              <h5 className="fw-bold">Classe Actual</h5>

              <div className="mb-3">
                <label className="form-label">Ano lectivo:</label>
                <select className="form-select">
                  <option>2023/2024</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Curso:</label>
                <select className="form-select">
                  <option>Sem Opção</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Classe:</label>
                <select className="form-select">
                  <option>1ª Classe</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Turma:</label>
                <select className="form-select">
                  <option>1M/A</option>
                </select>
              </div>

              <div className="small text-muted mb-3">
                <div>Turma pertencente ao período: <b>Manhã</b></div>
                <div>Capacidade máxima: <b>45</b></div>
              </div>

              <button className="btn btn-primary w-100">
                Buscar...
              </button>

            </div>
          </div>
        </div>
        
        {/* ================= CENTER (TABELA) ================= */}
        <div className="col-md-4">
          <div className="card shadow-sm">
            <div className="card-body p-0">

              <div className="p-2 fw-bold text-center">
                Seleciona o aluno transferido:
              </div>

              <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table table-hover mb-0">
                  <thead className="table-primary">
                    <tr>
                      <th>ID</th>
                      <th>NOME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>588</td>
                      <td>Adilson Francisco Campos</td>
                    </tr>
                    <tr>
                      <td>90</td>
                      <td>Adriele Albertina Hilário Zango</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td>Aldair Dala Gunza</td>
                    </tr>
                    <tr>
                      <td>54</td>
                      <td>Alfredo Aristides Feliciano</td>
                    </tr>
                    <tr>
                      <td>872</td>
                      <td>Alquiles Miranda Bamba</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>

        {/* ================= RIGHT (FORM) ================= */}
        <div className="col-md-3">
          <div className="card shadow-sm">
            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">
                <h5 className="fw-bold border-bottom border-primary pb-1">
                  Notas Para:
                </h5>

                <select className="form-select form-select-sm w-auto">
                  <option>2024/2025</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Curso:</label>
                <select className="form-select">
                  <option>Sem Opção</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Classe:</label>
                <select className="form-select">
                  <option>1ª Classe</option>
                </select>
              </div>

              <div className="mb-2">
                <label className="form-label">Turma:</label>
                <select className="form-select">
                  <option>1M/A</option>
                </select>
              </div>

              <div className="small text-muted mb-2">
                Turma: Manhã | Capacidade: 45
              </div>

              <div className="mb-2">
                <label className="form-label">Disciplina:</label>
                <select className="form-select">
                  <option>Est.Meio</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Professor:</label>
                <input
                  className="form-control"
                  value="Florinda Wime Ngunda"
                  readOnly
                />
              </div>

              <div className="text-center">
                <button
                  className="btn btn-primary rounded-circle"
                  style={{ width: "60px", height: "60px" }} 
                >
                  ✓
                </button>
              </div>

            </div>
          </div>
        </div>
         <p> Notas já lançadas:  </p>
        {/* ================= RIGHT FINAL (MENSAGEM) ================= */}
        <div className="col-md-2 d-flex align-items-center">
          <div className="row">
          <p className="col-md-6">DISCIPLINAS  </p>       
            <p className="col-md-6">MF  </p>       
            </div>                          
          <div className="text-center text-primary fw-bold">
            <p>Ainda não se Atribuiu notas a este aluno.</p>
            <small className="text-muted">
              Verifique se o mesmo é aluno transferido ou interno.
            </small>
          </div>
        </div>

      </div>
    </div>
    </PageBase>

  );
};

export default TransferredNotes;