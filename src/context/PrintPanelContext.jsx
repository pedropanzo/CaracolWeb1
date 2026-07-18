import { createContext, useContext, useState, useCallback } from "react";
import PrintPanel from "../components/impressoesMenu/PrintPanel";
import { TABS } from "../data/reportData";

const PrintPanelContext = createContext(null);

/**
 * Provider global do painel de impressão.
 * Monta o <PrintPanel /> uma única vez, no topo da árvore, e expõe
 * `openPrintPanel(tab)` / `closePrintPanel()` para qualquer componente
 * do sistema, sem precisar renderizar o painel localmente.
 */
export function PrintPanelProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(TABS[TABS.length - 1]); // "Financ." por padrão

  const openPrintPanel = useCallback((tab) => {
    if (tab && TABS.includes(tab)) setActiveTab(tab);
    setIsOpen(true);
  }, []);

  const closePrintPanel = useCallback(() => setIsOpen(false), []);

  return (
    <PrintPanelContext.Provider
      value={{ isOpen, activeTab, setActiveTab, openPrintPanel, closePrintPanel }}
    >
      {children}
      {isOpen && (
        <PrintPanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={closePrintPanel}
        />
      )}
    </PrintPanelContext.Provider>
  );
}

export function usePrintPanel() {
  const ctx = useContext(PrintPanelContext);
  if (!ctx) {
    throw new Error("usePrintPanel precisa ser usado dentro de <PrintPanelProvider>");
  }
  return ctx;
}
