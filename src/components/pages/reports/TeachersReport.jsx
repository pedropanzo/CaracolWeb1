import React from "react";
import ReportHeader from "../../reports/ReportHeader";
import ReportFilters from "../../reports/ReportFilters";
import TeachersTable from "../../reports/TeachersTable";
import PageBase from "../../Layout/PageBase/PageBase";

const TeachersReport = () => {
  return (
    <PageBase title="Impressão da lista de Professores">
      <div style={{ padding: "20px" }}>
        <ReportHeader />
        <ReportFilters />
        <TeachersTable />
      </div>
    </PageBase>
  );
};

export default TeachersReport;