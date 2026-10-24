import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRightLeft,
  BookOpenCheck,
  Check,
  ClipboardList,
  FileCheck2,
  Search,
  X,
} from "lucide-react";
import PageBase from "@/layout/PageBase/PageBase";
import { usePedagogicalStore } from "../../../stores/pedagogical.store";
import "./pedagogical.css";

const sections = [
  { path: "/lancamento-notas", label: "Lançamento de notas", key: "grades" },
  { path: "/cumprimento-notas", label: "Cumprimento de notas", key: "transfers" },
  { path: "/notas-implantadas", label: "Notas implantadas", key: "entered" },
  { path: "/transicaodeclasse", label: "Transição de classe", key: "transition" },
];

const pageDetails = {
  grades: {
    eyebrow: "Avaliação escolar",
    title: "Lançamento de notas",
    description: "Registe as avaliações dos alunos por disciplina e trimestre.",
    action: "Lançar notas",
    empty: "Não há alunos por avaliar com os filtros seleccionados.",
  },
  transfers: {
    eyebrow: "Percurso académico",
    title: "Cumprimento de notas",
    description: "Acompanhe a validação de notas dos alunos transferidos.",
    action: "Validar transferência",
    empty: "Não há transferências pendentes para os filtros seleccionados.",
  },
  entered: {
    eyebrow: "Avaliação escolar",
    title: "Notas implantadas",
    description: "Consulte e actualize as notas já registadas no sistema.",
    action: "Editar notas",
    empty: "Ainda não existem notas implantadas com estes filtros.",
  },
  transition: {
    eyebrow: "Progressão escolar",
    title: "Transição de classe",
    description: "Revise a situação académica e actualize a progressão dos alunos.",
    action: "Actualizar situação",
    empty: "Não há alunos para apresentar com estes filtros.",
  },
};

const initialForm = (student, type) => {
  if (type === "grades") {
    return {
      mac: student.notes?.mac ?? "",
      npp: student.notes?.npp ?? "",
      npt: student.notes?.npt ?? "",
    };
  }
  if (type === "transfers") {
    return {
      className: student.className,
      transferStatus: student.transferStatus,
    };
  }
  return {
    transitionStatus: student.transitionStatus,
    targetGrade: student.targetGrade,
  };
};

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function statusClass(status) {
  if (["Aprovado", "Concluída"].includes(status)) return "is-success";
  if (["Pendente", "Em análise"].includes(status)) return "is-warning";
  if (status === "Reprovado") return "is-danger";
  return "";
}

function PedagogicalForm({ student, type, onClose, onSave }) {
  const [form, setForm] = useState(() => initialForm(student, type));
  const setField = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const isGrades = type === "grades";
  const isTransfer = type === "transfers";
  const title = isGrades
    ? "Registar avaliação"
    : isTransfer
      ? "Validar transferência"
      : "Actualizar transição";

  const submit = (event) => {
    event.preventDefault();
    if (isGrades) {
      const notes = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, Number(value)]),
      );
      onSave({
        notes,
        year: student.year,
        trimester: student.trimester,
      });
    } else if (isTransfer) {
      onSave({
        className: form.className,
        transferStatus: form.transferStatus,
      });
    } else {
      onSave({
        transitionStatus: form.transitionStatus,
        targetGrade: form.targetGrade,
      });
    }
  };

  return (
    <div
      className="pedagogical-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="pedagogical-form-title"
        aria-modal="true"
        className="pedagogical-modal"
        role="dialog"
      >
        <header className="pedagogical-modal-header">
          <div>
            <p className="pedagogical-eyebrow">{student.registration}</p>
            <h2 id="pedagogical-form-title">{title}</h2>
            <p>{student.name} · {student.grade} · {student.className}</p>
          </div>
          <button
            aria-label="Fechar formulário"
            className="pedagogical-modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>
        <form className="pedagogical-form" onSubmit={submit}>
          {isGrades ? (
            <>
              <div className="pedagogical-info-card">
                <strong>{student.subject}</strong> · {student.teacher}<br />
                {student.year} · {student.trimester}
              </div>
              <div className="pedagogical-form-grid" style={{ marginTop: 16 }}>
                {[
                  ["mac", "MAC"],
                  ["npp", "NPP"],
                  ["npt", "NPT"],
                ].map(([name, label]) => (
                  <label className="pedagogical-field" key={name}>
                    {label} <span aria-hidden="true">(0–20)</span>
                    <input
                      max="20"
                      min="0"
                      name={name}
                      onChange={setField}
                      required
                      step="0.1"
                      type="number"
                      value={form[name]}
                    />
                  </label>
                ))}
              </div>
              <p className="pedagogical-form-hint">
                A média trimestral será calculada com base nas três avaliações
                introduzidas.
              </p>
            </>
          ) : isTransfer ? (
            <>
              <div className="pedagogical-info-card">
                <strong>Turma de origem:</strong> {student.sourceClass}<br />
                <strong>Notas registadas:</strong>{" "}
                {student.notes ? "Disponíveis para consulta" : "Ainda não registadas"}
              </div>
              <div className="pedagogical-form-grid" style={{ marginTop: 16 }}>
                <label className="pedagogical-field">
                  Turma de destino
                  <select
                    name="className"
                    onChange={setField}
                    required
                    value={form.className}
                  >
                    {["7.ª A", "7.ª B", "8.ª A", "8.ª B", "9.ª A"].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="pedagogical-field">
                  Estado da validação
                  <select
                    name="transferStatus"
                    onChange={setField}
                    required
                    value={form.transferStatus}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </label>
              </div>
              <p className="pedagogical-form-hint">
                Confirme a turma de destino depois de validar o processo e as
                notas transferidas.
              </p>
            </>
          ) : (
            <>
              <div className="pedagogical-info-card">
                <strong>Classe actual:</strong> {student.grade} ·{" "}
                <strong>Turma:</strong> {student.className}
              </div>
              <div className="pedagogical-form-grid" style={{ marginTop: 16 }}>
                <label className="pedagogical-field">
                  Situação académica
                  <select
                    name="transitionStatus"
                    onChange={setField}
                    required
                    value={form.transitionStatus}
                  >
                    <option value="Em análise">Em análise</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Reprovado">Reprovado</option>
                  </select>
                </label>
                <label className="pedagogical-field">
                  Classe de destino
                  <select
                    name="targetGrade"
                    onChange={setField}
                    required
                    value={form.targetGrade}
                  >
                    {["7.ª Classe", "8.ª Classe", "9.ª Classe", "10.ª Classe"].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <p className="pedagogical-form-hint">
                A situação e a classe de destino serão partilhadas com o registo
                pedagógico mockado.
              </p>
            </>
          )}
          <footer className="pedagogical-form-actions">
            <button
              className="pedagogical-button pedagogical-button-secondary"
              onClick={onClose}
              type="button"
            >
              Cancelar
            </button>
            <button className="pedagogical-button pedagogical-button-primary" type="submit">
              <Check size={16} />
              Guardar alterações
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default function PedagogicalPage() {
  const { pathname } = useLocation();
  const currentPath = pathname === "/TransferredNotes" ? "/cumprimento-notas" : pathname;
  const section = sections.find((item) => item.path === currentPath) || sections[0];
  const page = pageDetails[section.key];
  const students = usePedagogicalStore((state) => state.students);
  const updateStudent = usePedagogicalStore((state) => state.updateStudent);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("Todas as turmas");
  const [recordToEdit, setRecordToEdit] = useState(null);

  const visibleStudents = useMemo(() => {
    let items = students;
    if (section.key === "grades") items = items.filter((student) => !student.notes);
    if (section.key === "entered") items = items.filter((student) => student.notes);
    if (section.key === "transfers") {
      items = items.filter((student) => student.transferStatus !== "Sem pedido");
    }
    return items.filter((student) => {
      const matchesClass =
        classFilter === "Todas as turmas" || student.className === classFilter;
      const matchesSearch = `${student.name} ${student.registration} ${student.subject}`
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [students, section.key, classFilter, search]);

  const scoreCount = students.filter((student) => student.notes).length;
  const pendingTransfers = students.filter(
    (student) => student.transferStatus === "Pendente",
  ).length;
  const pendingTransitions = students.filter(
    (student) => student.transitionStatus === "Em análise",
  ).length;
  const statValues = section.key === "grades"
    ? [
        ["Alunos por avaliar", students.filter((student) => !student.notes).length],
        ["Notas já lançadas", scoreCount],
        ["Turmas abrangidas", new Set(students.map((student) => student.className)).size],
      ]
    : section.key === "entered"
      ? [
          ["Registos de notas", scoreCount],
          ["Alunos avaliados", scoreCount],
          ["Turmas abrangidas", new Set(students.filter((student) => student.notes).map((student) => student.className)).size],
        ]
      : section.key === "transfers"
        ? [
            ["Processos", students.filter((student) => student.transferStatus !== "Sem pedido").length],
            ["Pendentes", pendingTransfers],
            ["Concluídos", students.filter((student) => student.transferStatus === "Concluída").length],
          ]
        : [
            ["Alunos avaliados", students.length],
            ["Em análise", pendingTransitions],
            ["Aprovados", students.filter((student) => student.transitionStatus === "Aprovado").length],
          ];

  const openForm = (student) => setRecordToEdit(student);
  const saveRecord = (changes) => {
    updateStudent(recordToEdit.id, changes);
    setRecordToEdit(null);
  };
  const classes = ["Todas as turmas", ...new Set(students.map((student) => student.className))];

  const columns = section.key === "grades"
    ? ["Aluno", "Turma", "Disciplina", "Professor", "Acção"]
    : section.key === "entered"
      ? ["Aluno", "Turma", "Disciplina", "MAC", "NPP", "NPT", "Média", "Acção"]
      : section.key === "transfers"
        ? ["Aluno", "Origem", "Destino", "Notas", "Estado", "Acção"]
        : ["Aluno", "Classe actual", "Situação", "Classe de destino", "Acção"];

  const renderRow = (student) => {
    const mean = student.notes
      ? (
          (Number(student.notes.mac) +
            Number(student.notes.npp) +
            Number(student.notes.npt)) /
          3
        ).toFixed(1)
      : "—";
    const action = (
      <button
        className="pedagogical-action"
        onClick={() => openForm(student)}
        type="button"
      >
        {section.key === "grades" ? "Lançar notas" : page.action}
      </button>
    );
    const studentCell = (
      <span className="pedagogical-student">
        <span className="pedagogical-avatar">{initials(student.name)}</span>
        <span>
          <strong>{student.name}</strong>
          <small>{student.registration}</small>
        </span>
      </span>
    );

    if (section.key === "grades") {
      return (
        <>
          <td>{studentCell}</td><td>{student.className}</td>
          <td>{student.subject}</td><td>{student.teacher}</td><td>{action}</td>
        </>
      );
    }
    if (section.key === "entered") {
      return (
        <>
          <td>{studentCell}</td><td>{student.className}</td><td>{student.subject}</td>
          <td>{student.notes.mac}</td><td>{student.notes.npp}</td>
          <td>{student.notes.npt}</td><td><strong>{mean}</strong></td><td>{action}</td>
        </>
      );
    }
    if (section.key === "transfers") {
      return (
        <>
          <td>{studentCell}</td><td>{student.sourceClass}</td><td>{student.className}</td>
          <td>{student.notes ? "Disponíveis" : "Por lançar"}</td>
          <td><span className={`pedagogical-badge ${statusClass(student.transferStatus)}`}>{student.transferStatus}</span></td>
          <td>{action}</td>
        </>
      );
    }
    return (
      <>
        <td>{studentCell}</td><td>{student.grade} · {student.className}</td>
        <td><span className={`pedagogical-badge ${statusClass(student.transitionStatus)}`}>{student.transitionStatus}</span></td>
        <td>{student.targetGrade}</td><td>{action}</td>
      </>
    );
  };

  const SectionIcon = section.key === "grades"
    ? BookOpenCheck
    : section.key === "transfers"
      ? ArrowRightLeft
      : section.key === "entered"
        ? FileCheck2
        : ClipboardList;

  return (
    <PageBase title="Gestão pedagógica" subtitle="Avaliações, transferências e progressão dos alunos.">
      <main className="pedagogical-page">
        <header className="pedagogical-heading">
          <div>
            <p className="pedagogical-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <SectionIcon color="#007AF0" size={30} strokeWidth={1.8} />
        </header>

        <nav aria-label="Submenus pedagógicos" className="pedagogical-tabs">
          {sections.map((item) => (
            <Link
              className={item.key === section.key ? "is-active" : ""}
              key={item.path}
              to={item.path}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <section aria-label="Resumo pedagógico" className="pedagogical-stats">
          {statValues.map(([label, value]) => (
            <article className="pedagogical-stat" key={label}>
              <span>{label}</span><strong>{value}</strong>
            </article>
          ))}
        </section>

        <section aria-label={page.title} className="pedagogical-panel">
          <div className="pedagogical-toolbar">
            <label className="pedagogical-search">
              <Search size={17} />
              <input
                aria-label="Pesquisar alunos"
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Pesquisar por aluno ou matrícula..."
                type="search"
                value={search}
              />
            </label>
            <div className="pedagogical-toolbar-group">
              <select
                aria-label="Filtrar por turma"
                className="pedagogical-filter"
                onChange={(event) => setClassFilter(event.target.value)}
                value={classFilter}
              >
                {classes.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="pedagogical-table-wrap">
            <table className="pedagogical-table">
              <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
              <tbody>
                {visibleStudents.length ? visibleStudents.map((student) => (
                  <tr key={student.id}>{renderRow(student)}</tr>
                )) : (
                  <tr><td className="pedagogical-empty" colSpan={columns.length}>{page.empty}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <p className="pedagogical-info-card">
          <strong>Ano lectivo:</strong> 2026/2027 · Os dados são demonstrativos e
          ficam partilhados entre as páginas pedagógicas neste navegador.
        </p>
      </main>
      {recordToEdit && (
        <PedagogicalForm
          onClose={() => setRecordToEdit(null)}
          onSave={saveRecord}
          student={recordToEdit}
          type={section.key === "entered" ? "grades" : section.key}
        />
      )}
    </PageBase>
  );
}
