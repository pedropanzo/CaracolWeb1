import React, { useState } from "react";
import Header from "../../reports/Header";
import Filters from "../../reports/Filters";
import Table from "../../reports/Table";
import PageBase from "@/layout/PageBase/PageBase";
const ServiceCostHistoryPage = () => {
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");

  const data = [{
    classe: "1ª Classe",
    servico: "Matrícula",
    custo: "4000,00",
    data: "10/01/2024",
    computador: "PC-01",
    usuario: "Admin-Elias Bernardo",
  },
  {
    classe: "1ª Classe",
    servico: "Propina",
    custo: "4500,00",
    data: "10/02/2024",
    computador: "PC-02",
    usuario: "Kilunga Manuel",
  },
  {
    classe: "2ª Classe",
    servico: "Confirmação",
    custo: "3000,00",
    data: "15/02/2024",
    computador: "PC-01",
    usuario: "Paka Emanuel",
  },
  {
    classe: "3ª Classe",
    servico: "Uniforme",
    custo: "10000,00",
    data: "20/02/2024",
    computador: "PC-03",
    usuario: "Cristovão Menayame",
  },
  {
    classe: "4ª Classe",
    servico: "Cartão de Estudante",
    custo: "2000,00",
    data: "25/02/2024",
    computador: "PC-02",
    usuario: "Cristovão Mata",
  },]; // mock vazio

  return (
    <PageBase title="Historico de custos de Serviços">
      <div style={{ padding: "21px" }}>
        <Header />

        <Filters
          inicio={inicio}
          fim={fim}
          setInicio={setInicio}
          setFim={setFim}
        />

        <Table data={data} />
      </div>
    </PageBase>
  );
};

export default ServiceCostHistoryPage;