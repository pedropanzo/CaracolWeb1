import { useState } from "react";

// ── Ícone de impressora SVG fiel ao original ──────────────────────────────────
const PrinterIcon = ({ variant = "list" }) => (
  <svg width="50" height="46" viewBox="0 0 54 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* corpo da impressora */}
    <rect x="8" y="14" width="38" height="22" rx="3" fill="#b3d4f0" stroke="#2176c7" strokeWidth="1.5"/>
    {/* folha de entrada (topo) */}
    <rect x="14" y="4" width="26" height="13" rx="2" fill="#daeeff" stroke="#2176c7" strokeWidth="1.5"/>
    {/* folha de saída (baixo) */}
    <rect x="14" y="29" width="26" height="17" rx="2" fill="#daeeff" stroke="#2176c7" strokeWidth="1.5"/>
    {/* ponto de status no canto */}
    <circle cx="40" cy="22" r="2.5" fill="#2176c7"/>
    {/* linhas de texto na folha — variam por variante */}
    {variant === "list" && <>
      <line x1="19" y1="34" x2="35" y2="34" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="38" x2="35" y2="38" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="42" x2="28" y2="42" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
    </>}
    {variant === "card" && <>
      <circle cx="21" cy="36" r="4" fill="#b3d4f0" stroke="#2176c7" strokeWidth="1.2"/>
      <line x1="28" y1="34" x2="36" y2="34" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="28" y1="38" x2="34" y2="38" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="42" x2="35" y2="42" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
    </>}
    {variant === "suspend" && <>
      <line x1="19" y1="34" x2="35" y2="34" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="38" x2="35" y2="38" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="42" x2="28" y2="42" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="20" y1="20" x2="27" y2="27" stroke="#e05252" strokeWidth="1.6"/>
      <line x1="27" y1="20" x2="20" y2="27" stroke="#e05252" strokeWidth="1.6"/>
    </>}
    {variant === "exit" && <>
      <line x1="19" y1="34" x2="35" y2="34" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="38" x2="35" y2="38" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="19" y1="42" x2="28" y2="42" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
      <polyline points="21,28 21,20 29,20" stroke="#e05252" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" y1="20" x2="28" y2="27" stroke="#e05252" strokeWidth="1.6" strokeLinecap="round"/>
    </>}
    {variant === "people" && <>
      <circle cx="21" cy="36" r="2.5" fill="#b3d4f0" stroke="#2176c7" strokeWidth="1"/>
      <circle cx="27" cy="36" r="2.5" fill="#b3d4f0" stroke="#2176c7" strokeWidth="1"/>
      <circle cx="33" cy="36" r="2.5" fill="#b3d4f0" stroke="#2176c7" strokeWidth="1"/>
      <line x1="19" y1="42" x2="35" y2="42" stroke="#2176c7" strokeWidth="1.2" strokeLinecap="round"/>
    </>}
  </svg>
);

// ── Dados das abas ────────────────────────────────────────────────────────────
const TABS = [
  {
    label: "Adm.",
    sectionTitle: "Impressões Administrativas",
    items: [
      { title: "Listar classe",        desc: "Imprimir a lista dos alunos.",             icon: "list",    action: "listar-classe" },
      { title: "Cartão",               desc: "Imprimir cartão de estudante",             icon: "card",    action: "cartao" },
      { title: "Lista de Suspensos",   desc: "Imprimir a lista dos alunos suspensos.",   icon: "suspend", action: "suspensos" },
      { title: "Lista de Desistentes", desc: "Imprimir a lista dos alunos desistentes.", icon: "exit",    action: "desistentes" },
      { title: "Listar Funcionários",  desc: "Imprimir a lista dos Funcionários.",       icon: "people",  action: "funcionarios" },
    ],
  },
  {
    label: "Pedag.",
    sectionTitle: "Impressões Pedagógicas",
    items: [
      { title: "Boletim",          desc: "Imprimir boletim escolar.",        icon: "list", action: "boletim" },
      { title: "Diário de Classe", desc: "Imprimir diário de frequência.",   icon: "card", action: "diario" },
      { title: "Histórico",        desc: "Imprimir histórico do aluno.",     icon: "exit", action: "historico" },
    ],
  },
  {
    label: "Financ.",
    sectionTitle: "Impressões Financeiras",
    items: [
      { title: "Recibo",        desc: "Imprimir recibo de pagamento.",    icon: "card",    action: "recibo" },
      { title: "Inadimplentes", desc: "Imprimir lista de inadimplentes.", icon: "suspend", action: "inadimplentes" },
    ],
  },
];

// ── Componente ────────────────────────────────────────────────────────────────
export default function ImpressoesMenu({ onItemClick }) {
  const [activeTab, setActiveTab] = useState(0);
  const [hovered, setHovered] = useState(null);
  const tab = TABS[activeTab];

  return (
    <div style={s.panel}>

      {/* Linha de abas (radio style) */}
      <div style={s.tabBar}>
        {TABS.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setActiveTab(i)}
            style={{ ...s.tab, ...(activeTab === i ? s.tabActive : {}) }}
          >
            <span style={{
              ...s.radioCircle,
              ...(activeTab === i ? s.radioChecked : {}),
            }}>
              {activeTab === i && <span style={s.radioDot} />}
            </span>
            {t.label}
          </button>
        ))}
      </div>

      {/* Título da seção */}
      <p style={s.sectionTitle}>-{tab.sectionTitle}-</p>

      {/* Lista de cards */}
      <div style={s.scrollArea}>
        {tab.items.map((item, idx) => (
          <button
            key={item.action}
            style={{
              ...s.card,
              ...(hovered === idx ? s.cardHover : {}),
            }}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onItemClick?.(item.action)}
          >
            <PrinterIcon variant={item.icon} />
            <div style={s.cardText}>
              <span style={s.cardTitle}>{item.title}</span>
              <span style={s.cardDesc}>{item.desc}</span>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}

// ── Estilos ───────────────────────────────────────────────────────────────────
const s = {
  panel: {
    width: "100%",
    height: "100%",
    background: "#f0f0f0",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    overflow: "hidden",
  },

  // ── abas ──
  tabBar: {
    display: "flex",
    alignItems: "center",
    padding: "8px 8px 6px",
    gap: 6,
    background: "#f0f0f0",
    flexShrink: 0,
  },
  tab: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 11,
    color: "#333",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "2px 4px",
    fontFamily: "Arial, sans-serif",
  },
  tabActive: {
    fontWeight: 700,
  },
  radioCircle: {
    width: 12,
    height: 12,
    borderRadius: "50%",
    border: "1.5px solid #999",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: "#fff",
  },
  radioChecked: {
    border: "1.5px solid #2176c7",
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "#2176c7",
  },

  // ── título ──
  sectionTitle: {
    fontSize: 11,
    color: "#555",
    textAlign: "center",
    padding: "3px 0 5px",
    flexShrink: 0,
    fontFamily: "monospace",
    letterSpacing: 0.2,
  },

  // ── lista ──
  scrollArea: {
    overflowY: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 7,           // ← padding entre os cards
    padding: "4px 8px 8px",
  },

  // ── card individual ──
  card: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "8px 10px",
    background: "#d6eaf8",
    borderRadius: 5,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    transition: "background 0.12s",
  },
  cardHover: {
    background: "#bbd9f0",
  },
  cardText: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    flex: 1,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: "#1565c0",
    lineHeight: 1.2,
  },
  cardDesc: {
    fontSize: 10.5,
    color: "#2c3e50",
    lineHeight: 1.35,
  },
};
