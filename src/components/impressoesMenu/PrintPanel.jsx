import { useRef, useState, useCallback, useEffect, useId } from "react";
import {
  Printer,
  GripHorizontal,
  X,
  Minus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { REPORT_DATA, TABS } from "../../data/reportData";
import "./PrintPanel.css";

function ReportRow({ text }) {
  return (
    <div className="pp-row">
      <div className="pp-row-icon">
        <Printer size={17} strokeWidth={2.2} />
      </div>
      <span className="pp-row-text">{text}</span>
    </div>
  );
}

function ReportGroup({ title, items }) {
  return (
    <div className="pp-group">
      <div className="pp-group-bar" />
      <div className="pp-group-body">
        <div className="pp-group-title">{title}</div>
        <div className="pp-group-items">
          {items.map((it, i) => (
            <ReportRow key={i} text={it} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Painel flutuante de impressão.
 *
 * Componente "burro": só sabe desenhar e arrastar. Quem controla se ele está
 * aberto e qual aba está ativa é o PrintPanelContext, então este mesmo
 * componente pode ser chamado de qualquer lugar do sistema (menu, atalho,
 * botão de ação, etc.) sem duplicar estado.
 */
export default function PrintPanel({ activeTab, setActiveTab, onClose }) {
  const panelRef = useRef(null);
  const dragInfo = useRef({ dragging: false, offsetX: 0, offsetY: 0 });
  const [pos, setPos] = useState({ x: 100, y: 65 });
  const [dragging, setDragging] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const radioName = useId();

  const onPointerDown = useCallback((e) => {
    const rect = panelRef.current.getBoundingClientRect();
    dragInfo.current = {
      dragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
    setDragging(true);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragInfo.current.dragging) return;
      setPos({
        x: e.clientX - dragInfo.current.offsetX,
        y: e.clientY - dragInfo.current.offsetY,
      });
    };
    const onUp = () => {
      dragInfo.current.dragging = false;
      setDragging(false);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  const current = REPORT_DATA[activeTab];

  return (
    <div
      ref={panelRef}
      className={`pp-panel ${dragging ? "pp-dragging" : ""}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div className="pp-titlebar" onMouseDown={onPointerDown}>
        <GripHorizontal size={16} className="pp-grip" />
        <span className="pp-titlebar-label">PAINEL DE IMPRESSÃO</span>
        <div className="pp-titlebar-actions">
          <button
            className="pp-icon-btn"
            onClick={() => setMinimized((m) => !m)}
            aria-label="Minimizar"
          >
            <Minus size={14} />
          </button>
          <button className="pp-icon-btn" onClick={onClose} aria-label="Fechar">
            <X size={14} />
          </button>
        </div>
      </div>

      {!minimized && (
        <div className="pp-body">
          <fieldset className="pp-tabs">
            <legend className="pp-visually-hidden">Tipo de impressão</legend>
            {TABS.map((tab) => (
              <label key={tab} className="pp-radio-label">
                <input
                  type="radio"
                  name={radioName}
                  value={tab}
                  checked={activeTab === tab}
                  onChange={() => setActiveTab(tab)}
                  className="pp-radio-input"
                />
                <span className="pp-radio-dot" aria-hidden="true" />
                {tab}
              </label>
            ))}
          </fieldset>

          <div className="pp-section-label">- {current.label} -</div>

          <div className="pp-list">
            {current.groups.map((g, i) => (
              <ReportGroup key={i} {...g} />
            ))}
          </div>

          <div className="pp-scroll-indicator">
            <ChevronLeft size={14} />
            <div className="pp-scroll-track" />
            <ChevronRight size={14} />
          </div>
        </div>
      )}
    </div>
  );
}
