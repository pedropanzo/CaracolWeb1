import React from "react";

const ServicosTable = () => {
  const servicos = [
    { nome: "Setembro", total: 69 },
    { nome: "Outubro", total: 12 },
    { nome: "Confirmação", total: 6 },
    { nome: "Fevereiro", total: 2 },
  ];

  return (
    <div style={{ maxHeight: "400px", overflowY: "auto", backgroundColor: "white" }}>
      <table className="table">
        <thead>
          <tr>
            <th>SERVIÇOS</th>
            <th>TOTAL</th>
          </tr>
        </thead>

        <tbody>
          {servicos.map((s, i) => (
            <tr key={i}>
              <td>{s.nome}</td>
              <td>{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServicosTable;