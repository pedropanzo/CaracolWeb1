import React from "react";
import data from "./excessoesMock";

const ExcessoesTable = () => {
  return (
    <div style={{ overflowY: "auto", maxHeight: "400px", backgroundColor: "white" }}>
      <table className="table">
        <thead>
          <tr >
            <th>ID</th>
            <th>NOME COMPLETO</th>
            <th>TURMA</th>
            <th>EXCESSÕES</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td>{item.turma}</td>
              <td>{item.excessoes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExcessoesTable;