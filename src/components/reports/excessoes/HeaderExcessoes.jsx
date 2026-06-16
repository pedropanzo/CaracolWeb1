import React from "react";
import FilterAno from "./FilterAno";
import TotalCard from "./TotalCard";

const HeaderExcessoes = () => {
  return (
    <div>
      {/* TOPO */}
      <div style={{ background: "#0d6efd", display: "flex", alignItems: "center", gap: "20px",  }}>        
        <FilterAno />
        <button  className="btn btn-default" > RELATÓRIO </button>                
        <TotalCard />        
      </div>
    </div>
  );
};

export default HeaderExcessoes;