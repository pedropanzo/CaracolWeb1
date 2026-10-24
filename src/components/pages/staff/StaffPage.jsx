import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  BookOpenCheck,
  Check,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  UserRoundX,
  UsersRound,
  X,
} from "lucide-react";
import PageBase from "../../layout/PageBase/PageBase";
import { useStaffStore } from "../../../stores/staff.store";
import "./staff.css";

const pageConfig = {
  "/administradores": {
    type: "employee",
    title: "Funcionários administrativos",
    description: "Organize os dados e o estado da equipa administrativa.",
    eyebrow: "Gestão de pessoal",
    columns: [
      ["nome", "Funcionário"],
      ["cargo", "Cargo"],
      ["contacto", "Contacto"],
      ["residencia", "Residência"],
      ["status", "Estado"],
    ],
    formTitle: "Dados do funcionário",
    formDescription: "Preencha os dados profissionais e de contacto.",
    roleLabel: "Cargo",
    rolePlaceholder: "Ex.: Assistente administrativo",
  },
  "/professores": {
    type: "teacher",
    title: "Professores",
    description: "Mantenha os dados da equipa docente organizados.",
    eyebrow: "Gestão pedagógica",
    columns: [
      ["nome", "Professor"],
      ["cargo", "Disciplina / cargo"],
      ["contacto", "Contacto"],
      ["residencia", "Residência"],
      ["status", "Estado"],
    ],
    formTitle: "Dados do professor",
    formDescription: "Registe os dados pessoais e a área de ensino.",
    roleLabel: "Disciplina / cargo",
    rolePlaceholder: "Ex.: Professor de Matemática",
  },
  "/usuarios": {
    type: "user",
    title: "Usuários",
    description: "Gira as contas de acesso e os respectivos perfis.",
    eyebrow: "Acesso ao sistema",
    columns: [
      ["nome", "Utilizador"],
      ["email", "E-mail"],
      ["perfil", "Perfil de acesso"],
      ["ultimoAcesso", "Último acesso"],
      ["status", "Estado"],
    ],
    formTitle: "Dados da conta",
    formDescription: "Defina a identificação e o nível de acesso.",
  },
};

const emptyForm = (type) =>
  type === "user"
    ? {
        nome: "",
        utilizador: "",
        email: "",
        perfil: "Professor",
        status: "ativo",
      }
    : {
        nome: "",
        sexo: "F",
        estadoCivil: "",
        residencia: "",
        contacto: "",
        cargo: "",
        data: new Date().toLocaleDateString("pt-PT"),
        status: "ativo",
      };

function toDateInput(value) {
  const match = value?.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match ? `${match[3]}-${match[2]}-${match[1]}` : "";
}

function toDisplayDate(value) {
  if (!value) return new Date().toLocaleDateString("pt-PT");
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function initials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  options,
  placeholder,
  wide,
}) {
  return (
    <label className={`staff-field${wide ? " is-wide" : ""}`}>
      {label}
      {options ? (
        <select name={name} value={value} onChange={onChange} required>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      )}
    </label>
  );
}

function StaffForm({ page, initialValue, onClose, onSave }) {
  const [form, setForm] = useState(() => {
    const value = initialValue || emptyForm(page.type);
    return page.type === "user"
      ? { ...value }
      : { ...value, data: toDateInput(value.data) };
  });
  const isEditing = Boolean(initialValue);
  const onChange = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    onSave(
      page.type === "user"
        ? { ...form, ultimoAcesso: form.ultimoAcesso || "Sem acesso" }
        : { ...form, data: toDisplayDate(form.data) },
    );
  };

  return (
    <div
      className="staff-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="staff-form-title"
        aria-modal="true"
        className="staff-modal"
        role="dialog"
      >
        <header className="staff-modal-header">
          <div>
            <p className="staff-eyebrow">{page.eyebrow}</p>
            <h2 id="staff-form-title">
              {isEditing ? "Editar registo" : page.formTitle}
            </h2>
            <p>{page.formDescription}</p>
          </div>
          <button
            aria-label="Fechar formulário"
            className="staff-modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>

        <form className="staff-form" onSubmit={submit}>
          <section className="staff-form-section">
            <h3>{page.type === "user" ? "Identificação da conta" : "Dados pessoais"}</h3>
            <div className="staff-form-grid">
              <Field
                label="Nome completo"
                name="nome"
                value={form.nome}
                onChange={onChange}
                placeholder="Introduza o nome completo"
                wide
              />
              {page.type === "user" ? (
                <>
                  <Field
                    label="Nome de utilizador"
                    name="utilizador"
                    value={form.utilizador}
                    onChange={onChange}
                  />
                  <Field
                    label="E-mail"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                  />
                </>
              ) : (
                <>
                  <Field
                    label="Sexo"
                    name="sexo"
                    value={form.sexo}
                    onChange={onChange}
                    options={[
                      { value: "F", label: "Feminino" },
                      { value: "M", label: "Masculino" },
                    ]}
                  />
                  <Field
                    label="Estado civil"
                    name="estadoCivil"
                    value={form.estadoCivil}
                    onChange={onChange}
                    options={[
                      { value: "", label: "Seleccione" },
                      { value: "Solteiro", label: "Solteiro(a)" },
                      { value: "Casado", label: "Casado(a)" },
                      { value: "Divorciado", label: "Divorciado(a)" },
                      { value: "Viúvo", label: "Viúvo(a)" },
                    ]}
                  />
                </>
              )}
            </div>
          </section>

          <section className="staff-form-section">
            <h3>{page.type === "user" ? "Permissões e estado" : "Dados profissionais"}</h3>
            <div className="staff-form-grid">
              {page.type === "user" ? (
                <Field
                  label="Perfil de acesso"
                  name="perfil"
                  value={form.perfil}
                  onChange={onChange}
                  options={[
                    { value: "Administrador", label: "Administrador" },
                    { value: "Assistente administrativo", label: "Assistente administrativo" },
                    { value: "Professor", label: "Professor" },
                    { value: "Professora", label: "Professora" },
                  ]}
                />
              ) : (
                <>
                  <Field
                    label={page.roleLabel}
                    name="cargo"
                    value={form.cargo}
                    onChange={onChange}
                    placeholder={page.rolePlaceholder}
                  />
                  <Field
                    label="Data de admissão"
                    name="data"
                    type="date"
                    value={form.data}
                    onChange={onChange}
                  />
                  <Field
                    label="Contacto telefónico"
                    name="contacto"
                    type="tel"
                    value={form.contacto}
                    onChange={onChange}
                  />
                  <Field
                    label="Residência"
                    name="residencia"
                    value={form.residencia}
                    onChange={onChange}
                  />
                </>
              )}
              <Field
                label="Estado da conta"
                name="status"
                value={form.status}
                onChange={onChange}
                options={[
                  { value: "ativo", label: "Activo" },
                  { value: "desativado", label: "Desactivado" },
                ]}
              />
            </div>
            {page.type === "user" && (
              <p className="staff-form-note">
                A conta é demonstrativa. Não introduza palavras-passe ou dados
                confidenciais neste formulário.
              </p>
            )}
          </section>

          <footer className="staff-form-actions">
            <button className="staff-secondary-button" onClick={onClose} type="button">
              Cancelar
            </button>
            <button className="staff-primary-button" type="submit">
              <Check size={16} />
              {isEditing ? "Guardar alterações" : "Guardar registo"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

export default function StaffPage() {
  const { pathname } = useLocation();
  const page = pageConfig[pathname];
  const employees = useStaffStore((state) => state.employees);
  const users = useStaffStore((state) => state.users);
  const saveEmployee = useStaffStore((state) => state.saveEmployee);
  const saveUser = useStaffStore((state) => state.saveUser);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("todos");
  const [formRecord, setFormRecord] = useState(null);
  const isUserPage = page.type === "user";
  const records = isUserPage
    ? users
    : employees.filter((employee) =>
        page.type === "teacher"
          ? employee.categoria === "Professor"
          : employee.categoria === "Administrativo",
      );
  const activeCount = records.filter((record) => record.status === "ativo").length;

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const matchesSearch = Object.values(record).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase()),
        );
        return (
          matchesSearch &&
          (filter === "todos" || record.status === filter)
        );
      }),
    [records, search, filter],
  );

  const saveRecord = (record) => {
    if (isUserPage) {
      saveUser(record);
    } else {
      saveEmployee({
        ...record,
        categoria: page.type === "teacher" ? "Professor" : "Administrativo",
      });
    }
    setFormRecord(null);
  };

  const pageIcon = isUserPage ? ShieldCheck : page.type === "teacher" ? BookOpenCheck : UsersRound;
  const StatIcon = pageIcon;

  return (
    <PageBase
      title="Gestão de pessoal"
      subtitle="Funcionários, docentes e contas de acesso da instituição."
    >
      <main className="staff-page">
        <section className="staff-intro">
          <div>
            <p className="staff-eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p>{page.description}</p>
          </div>
          <button
            className="staff-primary-button"
            onClick={() => setFormRecord({ mode: "new" })}
            type="button"
          >
            <Plus size={17} />
            {isUserPage ? "Nova conta" : "Novo registo"}
          </button>
        </section>

        <section aria-label="Resumo" className="staff-stats">
          <article className="staff-stat">
            <span className="staff-stat-icon"><StatIcon size={21} strokeWidth={2.1} /></span>
            <div><span>Total de registos</span><strong>{records.length}</strong></div>
          </article>
          <article className="staff-stat">
            <span className="staff-stat-icon"><Check size={21} strokeWidth={2.1} /></span>
            <div><span>Registos activos</span><strong>{activeCount}</strong></div>
          </article>
          <article className="staff-stat">
            <span className="staff-stat-icon"><UserRoundX size={21} strokeWidth={2.1} /></span>
            <div><span>Desactivados</span><strong>{records.length - activeCount}</strong></div>
          </article>
        </section>

        <section aria-label={`Lista de ${page.title}`} className="staff-panel">
          <div className="staff-toolbar">
            <label className="staff-search">
              <Search size={17} />
              <input
                aria-label={`Pesquisar ${page.title.toLowerCase()}`}
                placeholder="Pesquisar por nome, contacto ou cargo..."
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <select
              aria-label="Filtrar por estado"
              className="form-control"
              onChange={(event) => setFilter(event.target.value)}
              style={{ maxWidth: "170px" }}
              value={filter}
            >
              <option value="todos">Todos os estados</option>
              <option value="ativo">Activos</option>
              <option value="desativado">Desactivados</option>
            </select>
          </div>

          <div className="staff-table-wrap">
            <table className="staff-table">
              <thead>
                <tr>
                  {page.columns.map(([, label]) => <th key={label}>{label}</th>)}
                  <th aria-label="Acções" />
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length ? filteredRecords.map((record) => (
                  <tr key={record.id}>
                    {page.columns.map(([key]) => (
                      <td key={key}>
                        {key === "nome" ? (
                          <span className="staff-person">
                            <span className="staff-avatar">{initials(record.nome)}</span>
                            <span>
                              <strong>{record.nome}</strong>
                              <small>Registo #{record.id}</small>
                            </span>
                          </span>
                        ) : key === "status" ? (
                          <span className={`staff-status ${record.status === "ativo" ? "is-active" : "is-inactive"}`}>
                            {record.status === "ativo" ? "Activo" : "Desactivado"}
                          </span>
                        ) : record[key] || "—"}
                      </td>
                    ))}
                    <td>
                      <button
                        aria-label={`Editar ${record.nome}`}
                        className="staff-icon-button"
                        onClick={() => setFormRecord(record)}
                        title="Editar registo"
                        type="button"
                      >
                        <Pencil size={15} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className="staff-empty" colSpan={page.columns.length + 1}>
                      Nenhum registo corresponde à pesquisa ou ao filtro seleccionado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {formRecord && (
        <StaffForm
          initialValue={formRecord.mode === "new" ? null : formRecord}
          onClose={() => setFormRecord(null)}
          onSave={saveRecord}
          page={page}
        />
      )}
    </PageBase>
  );
}
