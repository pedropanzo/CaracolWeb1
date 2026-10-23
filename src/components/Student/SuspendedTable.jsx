// src/components/student/SuspendedTable.jsx
import React from "react";

const SuspendedTable = ({ students }) => {
  return (
    <div
      className="mx-auto"
      style={{
        maxWidth: "900px",
        background: "#fff",
        borderRadius: "10px",
        border: "1px solid #eee",
        overflow: "hidden"
      }}
    >
      <table className="table mb-0">

        <thead>
          <tr>
            <th style={{ background: "#0d6efd", color: "#fff", width: "100px" }}>
              ID
            </th>
            <th>NOME</th>
            <th>MOTIVO</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.suspension?.reason}</td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default SuspendedTable;