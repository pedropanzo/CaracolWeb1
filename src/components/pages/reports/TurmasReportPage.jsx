import React from "react";
import HeaderReport from "../../../components/reports/HeaderReport";
import TurmasTable from "../../../components/reports/TurmasTable";
import PageBase from "../../Layout/PageBase/PageBase";

const TurmasReportPage = () => {
  return (
    <PageBase title="Impressão do histórico de turmas criadas ">

      <div className="container-fluid px-4 py-3">

        <HeaderReport />

        <TurmasTable />

      </div>
    </PageBase>
  );
};

export default TurmasReportPage;