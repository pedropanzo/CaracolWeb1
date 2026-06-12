import React from "react";
import HeaderExcessoes from "../../reports/excessoes/HeaderExcessoes";
import ExcessoesTable from "../../reports/excessoes/ExcessoesTable";
import ServicosTable from "../../reports/excessoes/ServicosTable";
import PageBase from "../../Layout/PageBase/PageBase";

const ExcessoesPagamentoPage = () => {
  return (
    <PageBase title=" Alunos com excessões de pagamento" >
    <div style={{ padding: "20px" }}>
      <HeaderExcessoes />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={{ flex: 3 }}>
          <ExcessoesTable />
        </div>

        <div style={{ flex: 1 }}>
          <ServicosTable />
        </div>
      </div>
    </div>
    </PageBase>
  );
};

export default ExcessoesPagamentoPage;