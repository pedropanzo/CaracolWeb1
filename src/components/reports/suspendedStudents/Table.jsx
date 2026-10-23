import React from "react";

const Table = ({ students }) => {
  return (
    <div className="card border-0 shadow-sm">
      <div className="table-responsive">

        <table className="table mb-0 align-middle">

          <thead>
            <tr>
              <th className="bg-primary text-white text-center">ID</th>
              <th className="text-center">NOME</th>
              <th className="text-center">MOTIVO</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td className="text-center">{s.id}</td>
                <td>{s.name}</td>
                <td className="text-center">{s.suspension?.reason}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default Table;