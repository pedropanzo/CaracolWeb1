import React from "react";

const FilterAno = () => {
  return (
    <div
      style={{
        background: "white",
        padding: "10px 15px",
        borderRadius: "20px",
      }}
    >
      <div style={{ fontSize: "12px" }}>Ano lectivo</div>
      <select className="form-select form-select-sm">
        <option>2025/2026</option>
      </select>
    </div>
  );
};

export default FilterAno;