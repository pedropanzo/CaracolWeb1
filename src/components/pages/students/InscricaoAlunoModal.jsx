import { useState } from "react";

// ─── Icones ────────────────────────────────────────────────────────────────────
import iconSmall from "./../../../assets/img/svg/inscription/Classroom.svg";

// ─── Data ────────────────────────────────────────────────────────────────────
const provincias = [
  "Bengo","Benguela","Bié","Cabinda","Cuando Cubango","Cuanza Norte",
  "Cuanza Sul","Cunene","Huambo","Huíla","Luanda","Lunda Norte",
  "Lunda Sul","Malanje","Moxico","Namibe","Uíge","Zaire"
];

const cursosData = [
  { id: "", nome: "Sem Opção" },
  { id: "inf", nome: "Informática" },
  { id: "gest", nome: "Gestão" },
  { id: "cont", nome: "Contabilidade" },
];

const classesData = ["1ª Classe","2ª Classe","3ª Classe","4ª Classe","5ª Classe","6ª Classe"];

const turmasData = [
  { id: "1MA", label: "1M/A", periodo: "Manhã", capacidade: 45, matriculados: 30 },
  { id: "1MT", label: "1M/T", periodo: "Tarde",  capacidade: 40, matriculados: 22 },
  { id: "2MA", label: "2M/A", periodo: "Manhã", capacidade: 45, matriculados: 38 },
  { id: "2MT", label: "2M/T", periodo: "Tarde",  capacidade: 40, matriculados: 15 },
];

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `  

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── Overlay ── */
  .insc-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    z-index: 1000;
    animation: overlayIn 0.22s ease both;
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Card (modal) ── */
  .insc-card {
    font-family: 'DM Sans', sans-serif;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 8px 48px rgba(21,101,192,0.18), 0 2px 12px rgba(0,0,0,0.10);
    width: 100%;
    max-width: 680px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 36px 40px 40px;
    animation: cardIn 0.35s cubic-bezier(.22,1,.36,1) both;
    scrollbar-width: thin;
    scrollbar-color: #d0daea transparent;
  }
  .insc-card::-webkit-scrollbar { width: 6px; }
  .insc-card::-webkit-scrollbar-thumb { background: #d0daea; border-radius: 3px; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(28px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  .insc-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 28px;
  }
  .insc-title {
    font-family: 'Outfit', sans-serif;
    font-size: 2rem;
    font-weight: 700;
    color: #1a2340;
    letter-spacing: -0.5px;
  }
  .insc-icon-btn {
    width: 40px; height: 40px;
    background: #007AF0;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    border: none;
    transition: background 0.2s;
  }
  .insc-icon-btn:hover { background: #065fb9; }

  /* Steps indicator */
  .insc-steps {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
  }
  .insc-step {
    width: 28px; height: 28px;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Outfit', sans-serif;
    font-size: 0.78rem;
    font-weight: 700;
    transition: all 0.3s;
  }
  .insc-step-active { background: #007AF0; color: white; }
  .insc-step-done   { background: #43a047; color: white; }
  .insc-step-idle   { background: #e0e7f0; color: #6b7a99; }
  .insc-step-line { flex: 1; height: 2px; background: #d0daea; border-radius: 2px; }
  .insc-step-line-done { background: #43a047; }

  .insc-section-title {
    font-family: 'Outfit', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    color: #007AF0;
    text-align: center;
    margin-bottom: 24px;
    position: relative;
  }
  .insc-section-title::before, .insc-section-title::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 25%;
    height: 1px;
    background: #d0daea;
  }
  .insc-section-title::before { left: 0; }
  .insc-section-title::after  { right: 0; }

  .insc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 24px; }
  .insc-field { display: flex; flex-direction: column; gap: 6px; }
  .insc-field-full { grid-column: 1 / -1; }
  .insc-label { font-size: 0.78rem; font-weight: 500; color: #6b7a99; letter-spacing: 0.03em; }

  .insc-input, .insc-select {
    background: #ffffff;
    border: 1.5px solid #d0daea;
    border-radius: 8px;
    padding: 10px 13px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    color: #1a2340;
    outline: none;
    transition: border-color 0.18s, box-shadow 0.18s;
    width: 100%;
    appearance: none;
  }
  .insc-input:focus, .insc-select:focus {
    border-color: #2196F3;
    box-shadow: 0 0 0 3px rgba(33,150,243,0.13);
  }
  .insc-select-wrap { position: relative; }
  .insc-select-blue {
    background-color: #007AF0;
    color: white;
    cursor: pointer;
    padding-right: 36px;
    border-color: #007AF0;
  }
  .insc-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 12px; top: 50%;
    transform: translateY(-50%);
    color: white;
    pointer-events: none;
    font-size: 0.9rem;
  }
  .insc-radio-group { display: flex; gap: 20px; align-items: center; padding: 2px 0; }
  .insc-radio-label {
    display: flex; align-items: center; gap: 7px;
    font-size: 0.93rem; color: #1a2340; cursor: pointer; font-weight: 400;
  }
  .insc-divider { grid-column: 1 / -1; height: 1px; background: #d0daea; margin: 4px 0; }
  .insc-doc-box {
    grid-column: 1 / -1;
    border: 1.5px solid #d0daea;
    border-radius: 10px;
    padding: 16px 18px 18px;
    background: #f7faff;
  }
  .insc-doc-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 12px 16px; margin-top: 10px; }

  /* Buttons */
  .insc-btn {
    grid-column: 1 / -1;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 14px 28px;
    font-family: 'Outfit', sans-serif;
    font-size: 1.05rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    margin-top: 8px;
    transition: background 0.2s, transform 0.14s, box-shadow 0.18s;
    box-shadow: 0 4px 16px rgba(108,63,197,0.22);
    width: 100%;
  }
  .insc-btn:hover { background: #126bc4; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(108,63,197,0.28); }
  .insc-btn:active { transform: translateY(0); }
  .insc-btn-blue {
    background: #007AF0;
    box-shadow: 0 4px 16px rgba(21,101,192,0.22);
  }
  .insc-btn-blue:hover { background: #1976d2; box-shadow: 0 8px 24px rgba(21,101,192,0.28); }

  /* Step 2 – academic layout */
  .acad-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 4px; }
  .acad-fields { display: flex; flex-direction: column; gap: 16px; }
  .acad-info-txt { font-size: 0.82rem; color: #6b7a99; margin-top: 4px; line-height: 1.5; }

  /* Preview card */
  .acad-preview {
    border: 1.5px solid #d0daea;
    border-radius: 14px;
    padding: 20px 18px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    background: #fff;
    min-height: 260px;
  }
  .acad-preview-icon { font-size: 3.5rem; line-height: 1; margin-bottom: 2px; }
  .acad-preview-curso {
    font-family: 'Outfit', sans-serif;
    font-size: 1rem; font-weight: 700;
    color: #1a2340;
    text-align: center;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .acad-preview-val {
    font-size: 0.9rem; color: #1a2340; text-align: center; line-height: 1.7;
  }
  .acad-preview-val strong { font-weight: 600; }
  .acad-preview-alunos {
    font-size: 0.88rem; color: #1a2340; text-align: center; font-style: italic; line-height: 1.5;
  }

  /* Confirm checkmark */
  .acad-check-btn {
    width: 52px; height: 52px;
    background: #007AF0;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    border: none; cursor: pointer;
    margin-top: 8px;
    transition: background 0.2s, transform 0.15s;
    box-shadow: 0 4px 14px rgba(21,101,192,0.25);
    align-self: flex-start;
  }
  .acad-check-btn:hover { background: #1976D2; transform: scale(1.08); }

  /* Matricular button */
  .acad-matricular-btn {
    background: #007AF0;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 13px 24px;
    font-family: 'Outfit', sans-serif;
    font-size: 1rem; font-weight: 600;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    width: 100%;
    margin-top: 4px;
    transition: background 0.2s, transform 0.14s, box-shadow 0.18s;
    box-shadow: 0 4px 14px rgba(21,101,192,0.22);
  }
  .acad-matricular-btn:hover { background: #1976D2; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(21,101,192,0.28); }

  .acad-voltar {
    background: none;
    border: none;
    color: #6b7a99;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    cursor: pointer;
    text-align: center;
    width: 100%;
    margin-top: 14px;
    padding: 6px;
    transition: color 0.2s;
    text-decoration: underline;
  }
  .acad-voltar:hover { color: #007AF0; }

  @media (max-width: 560px) {
    .insc-card { padding: 24px 16px 28px; }
    .insc-grid { grid-template-columns: 1fr; }
    .insc-field-full { grid-column: 1; }
    .insc-doc-inner { grid-template-columns: 1fr; }
    .acad-layout { grid-template-columns: 1fr; }
  }
`;

// ─── Step 1: Dados Pessoal ────────────────────────────────────────────────────
function StepDadosPessoal({ data, onChange, onNext }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <>
      <div className="insc-section-title">Dados Pessoal</div>
      <div className="insc-grid">

        <div className="insc-field">
          <label className="insc-label">Processo nº</label>
          <input className="insc-input" type="text" value={data.processo} onChange={set("processo")} placeholder="853" />
        </div>

        <div className="insc-field">
          <label className="insc-label">Natural de</label>
          <input className="insc-input" type="text" value={data.naturalDe} onChange={set("naturalDe")} />
        </div>

        <div className="insc-field insc-field-full">
          <label className="insc-label">Nome do aluno</label>
          <input className="insc-input" type="text" value={data.nomeAluno} onChange={set("nomeAluno")} />
        </div>

        <div className="insc-field">
          <label className="insc-label">Género</label>
          <div className="insc-radio-group">
            <label className="insc-radio-label">
              <input type="radio" name="genero" value="M" checked={data.genero === "M"} onChange={set("genero")} /> Masculino
            </label>
            <label className="insc-radio-label">
              <input type="radio" name="genero" value="F" checked={data.genero === "F"} onChange={set("genero")} /> Femenino
            </label>
          </div>
        </div>

        <div className="insc-field">
          <label className="insc-label">Província</label>
          <div className="insc-select-wrap">
            <select className="insc-select insc-select-blue" value={data.provincia} onChange={set("provincia")}>
              <option value="">Selecionar</option>
              {provincias.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="insc-field">
          <label className="insc-label">Filho de</label>
          <input className="insc-input" type="text" value={data.filhoDe} onChange={set("filhoDe")} />
        </div>

        <div className="insc-field">
          <label className="insc-label">Município</label>
          <div className="insc-select-wrap">
            <select className="insc-select insc-select-blue" value={data.municipio} onChange={set("municipio")}>
              <option value="">Selecionar</option>
            </select>
          </div>
        </div>

        <div className="insc-field">
          <label className="insc-label">E de</label>
          <input className="insc-input" type="text" value={data.eDe} onChange={set("eDe")} />
        </div>

        <div className="insc-field">
          <label className="insc-label">Data de nascimento</label>
          <input className="insc-input" type="date" value={data.dataNascimento} onChange={set("dataNascimento")} />
        </div>

        <div className="insc-field insc-field-full">
          <label className="insc-label">Residência</label>
          <input className="insc-input" type="text" value={data.residencia} onChange={set("residencia")} />
        </div>

        <div className="insc-divider" />

        {/* Documento */}
        <div className="insc-doc-box">
          <div className="insc-radio-group" style={{ marginBottom: 10 }}>
            <label className="insc-radio-label">
              <input type="radio" name="docTipo" value="bi_cedula" checked={data.docTipo === "bi_cedula"} onChange={set("docTipo")} /> BI/Cédula
            </label>
            <label className="insc-radio-label">
              <input type="radio" name="docTipo" value="sem" checked={data.docTipo === "sem"} onChange={set("docTipo")} /> Sem BI/Cédula
            </label>
          </div>

          {data.docTipo === "bi_cedula" && (
            <>
              <div className="insc-radio-group" style={{ marginBottom: 14 }}>
                <label className="insc-radio-label">
                  <input type="radio" name="docSubtipo" value="bi" checked={data.docSubtipo === "bi"} onChange={set("docSubtipo")} /> BI
                </label>
                <label className="insc-radio-label">
                  <input type="radio" name="docSubtipo" value="cedula" checked={data.docSubtipo === "cedula"} onChange={set("docSubtipo")} /> Cédula
                </label>
              </div>
              <div className="insc-field" style={{ marginBottom: 12 }}>
                <label className="insc-label">Número</label>
                <input className="insc-input" type="text" value={data.docNumero} onChange={set("docNumero")} />
              </div>
              <div className="insc-doc-inner">
                <div className="insc-field">
                  <label className="insc-label">Emitido em</label>
                  <div className="insc-select-wrap">
                    <select className="insc-select insc-select-blue" value={data.emitidoEm} onChange={set("emitidoEm")}>
                      <option value="">Local</option>
                      <option>Luanda</option><option>Benguela</option><option>Huambo</option>
                    </select>
                  </div>
                </div>
                <div className="insc-field">
                  <label className="insc-label">Emitido Aos</label>
                  <input className="insc-input" type="date" value={data.emitidoAos} onChange={set("emitidoAos")} />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="insc-divider" />

        <div className="insc-field insc-field-full">
          <label className="insc-label">O encarregado de educação</label>
          <input className="insc-input" type="text" value={data.encarregado} onChange={set("encarregado")} />
        </div>

        <div className="insc-field">
          <label className="insc-label">NIF do encarregado</label>
          <div className="insc-select-wrap">
            <select className="insc-select insc-select-blue" value={data.nif} onChange={set("nif")}>
              <option value="">Selecionar</option>
              <option>Contribuinte</option>
              <option>Não contribuinte</option>
            </select>
          </div>
        </div>

        <div className="insc-field">
          <label className="insc-label">Contacto</label>
          <input className="insc-input" type="text" value={data.contacto} onChange={set("contacto")} />
        </div>

        <button className="insc-btn" onClick={onNext}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
          Seguinte
        </button>
      </div>
    </>
  );
}

// ─── Step 2: Dados Académico ──────────────────────────────────────────────────
function StepDadosAcademico({ data, onChange, onBack, onMatricular }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  const cursoNome = cursosData.find(c => c.id === data.curso)?.nome || "Sem Opção";
  const turma = turmasData.find(t => t.id === data.turma);

  return (
    <>
      <div className="insc-section-title">Dados Académico</div>

      <div className="acad-layout">
        {/* Left: selects */}
        <div className="acad-fields">
          <div className="insc-field">
            <label className="insc-label">Curso:</label>
            <div className="insc-select-wrap">
              <select className="insc-select insc-select-blue" value={data.curso} onChange={set("curso")}>
                {cursosData.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="insc-field">
            <label className="insc-label">Classe</label>
            <div className="insc-select-wrap">
              <select className="insc-select insc-select-blue" value={data.classe} onChange={set("classe")}>
                {classesData.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="insc-field">
            <label className="insc-label">Turma:</label>
            <div className="insc-select-wrap">
              <select className="insc-select insc-select-blue" value={data.turma} onChange={set("turma")}>
                {turmasData.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
            </div>
          </div>

          {turma && (
            <p className="acad-info-txt">
              Turma pertencente ao período: <strong>{turma.periodo}</strong><br />
              Capacidade máxima de Alunos: <strong>{turma.capacidade}</strong>
            </p>
          )}

          <button className="acad-check-btn" onClick={onMatricular} title="Confirmar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
        </div>

        {/* Right: preview card */}
        <div>
          <div className="acad-preview">
            <center> <img style={{ width: '110px', height: '110px' }} src={iconSmall} /> </center> 
            <div className="acad-preview-curso">Curso</div>
            <div style={{ fontSize: "0.95rem", color: "#1a2340", textAlign: "center" }}>{cursoNome}</div>
            {turma ? (
              <div className="acad-preview-val">
                <strong>Classe:</strong><br />
                {data.classe}<br />
                <strong>Turma:</strong> {turma.label}<br />
                <strong>Período:</strong> {turma.periodo}<br />
                <em>Tem:</em><br />
                {turma.matriculados}<br />
                Alunos matriculados.
              </div>
            ) : (
              <div className="acad-preview-val" style={{ color: "#aaa" }}>Selecione uma turma</div>
            )}
          </div>

          <button className="acad-matricular-btn" style={{ marginTop: 12 }} onClick={onMatricular}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
            Matricular
          </button>
        </div>
      </div>

      <button className="acad-voltar" onClick={onBack}>Voltar</button>
    </>
  );
}

// ─── Modal de Inscrição ───────────────────────────────────────────────────────
function InscricaoAlunoModal({ isOpen, onClose, onFinalSubmit }) {
  const [step, setStep] = useState(1);

  const [pessoal, setPessoal] = useState({
    processo: "", naturalDe: "", nomeAluno: "", genero: "M",
    provincia: "", municipio: "", filhoDe: "", eDe: "",
    dataNascimento: "2022-02-01", residencia: "",
    docTipo: "bi_cedula", docSubtipo: "bi", docNumero: "",
    emitidoEm: "", emitidoAos: "2022-02-01",
    encarregado: "", nif: "", contacto: "",
  });

  const [academico, setAcademico] = useState({
    curso: "", classe: "1ª Classe", turma: "1MA",
  });

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const handleMatricular = () => {
    const dados = { ...pessoal, ...academico };
    if (onFinalSubmit) onFinalSubmit(dados);
    else alert("Matrícula realizada!\n" + JSON.stringify(dados, null, 2));
    handleClose();
  };

  // Fechar ao clicar no overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="insc-overlay" onClick={handleOverlayClick}>
      <div className="insc-card">
        {/* Header */}
        <div className="insc-header">
          <span className="insc-title">Inscrição</span>
          <button className="insc-icon-btn" title="Fechar" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Steps */}
        <div className="insc-steps">
          <div className={`insc-step ${step === 1 ? "insc-step-active" : "insc-step-done"}`}>
            {step > 1 ? "✓" : "1"}
          </div>
          <div className={`insc-step-line ${step > 1 ? "insc-step-line-done" : ""}`} />
          <div className={`insc-step ${step === 2 ? "insc-step-active" : "insc-step-idle"}`}>2</div>
        </div>

        {step === 1 && (
          <StepDadosPessoal
            data={pessoal}
            onChange={setPessoal}
            onNext={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <StepDadosAcademico
            data={academico}
            onChange={setAcademico}
            onBack={() => setStep(1)}
            onMatricular={handleMatricular}
          />
        )}
      </div>
    </div>
  );
}

// ─── Exemplo de uso com botão ──────────────────────────────────────────
export default function App() {

  // ─── Mudei o status para abrir o modal ao caregar o formulário
  const [modalAberto, setModalAberto] = useState(true);
    
  return (    
    <>
      <style>{styles}</style>

      {/* Botão de abertura */}
      <center>
        <button
        className="btn btn-primary"
        onClick={() => setModalAberto(true)}
      >         
        Nova Inscrição
      </button>
      </center>
      

      {/* Modal */}
      <InscricaoAlunoModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onFinalSubmit={(dados) => {
          console.log("Dados da matrícula:", dados);
          // Aqui você processa os dados como quiser
        }}
      />
    </>
  );
}
