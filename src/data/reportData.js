// Conteúdo dos relatórios exibidos no painel de impressão, agrupado por aba.
// Cada grupo tem um título e uma lista de itens imprimíveis.

export const REPORT_DATA = {
  "Financ.": {
    label: "Impressões Financeira",
    groups: [
      {
        title: "Lista de Pagamento",
        items: [
          "Para alunos que pagaram.",
          "Para alunos devedores.",
          "Alunos sem pag. de matrícula e mensalidades além do prazo.",
        ],
      },
      {
        title: "Relatório de Atendimento",
        items: ["Para usuários."],
      },
      {
        title: "Relatório Diário",
        items: ["Para usuários."],
      },
      {
        title: "Comunicação AGT",
        items: ["Para envio à Agência Tributária."],
      },
    ],
  },
  Adm: {
    label: "Impressões Administrativa",
    groups: [
      {
        title: "Matrículas",
        items: ["Lista de matrículas ativas.", "Alunos transferidos no período."],
      },
      {
        title: "Documentos",
        items: ["Declaração de vaga.", "Ficha cadastral do aluno."],
      },
      {
        title: "Ocorrências",
        items: ["Registro de ocorrências do mês."],
      },
    ],
  },
  "Pedag.": {
    label: "Impressões Pedagógica",
    groups: [
      {
        title: "Boletim Escolar",
        items: ["Boletim individual por aluno.", "Boletim da turma."],
      },
      {
        title: "Frequência",
        items: ["Mapa de frequência mensal.", "Alunos com faltas excessivas."],
      },
      {
        title: "Planejamento",
        items: ["Plano de aula da semana."],
      },
    ],
  },
};

export const TABS = ["Adm", "Pedag.", "Financ."];
