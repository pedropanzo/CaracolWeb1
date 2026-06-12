import React from "react";
import FilterAno from "./FilterAno";
import NewButton from "./NewButton";
import TotalCard from "./TotalCard";

const HeaderExcessoes = () => {
  return (
    <div>

      {/* TÍTULO */}
      <h4 style={{ fontWeight: "600" }}>
        Alunos com{" "}
        <span style={{ borderBottom: "3px solid #0d6efd" }}>
          excessões de pagamento
        </span>
      </h4>

      {/* TOPO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          marginTop: "15px",
        }}
      >
        <FilterAno />
        <span style={{ fontWeight: "500" }}>RELATÓRIO</span>
        <NewButton />
        <TotalCard />
      </div>
    </div>
  );
};

export default HeaderExcessoes;