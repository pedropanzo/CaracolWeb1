import React from "react";
import FilterAno from "./FilterAno";
import TotalCard from "./TotalCard";

const HeaderExcessoes = () => {
  return (
    <div>
      {/* TOPO */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "15px", }}>        
        <FilterAno />
        <button  className="btn btn-default" > RELATÓRIO </button>                
        <TotalCard />
      </div>
    </div>
  );
};

export default HeaderExcessoes;