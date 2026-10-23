import { useState } from "react";
import StudentData from "../../../components/ui/tabs/studentdata";
import AcademicTimeline from "../../../components/ui/tabs/academictimeline";
import Grades from "../../../components/ui/tabs/Grades";
import Attendance from "../../../components/ui/tabs/Attendance";
import PaymentsHistory from "../../../components/ui/tabs/PaymentsHistory";
import DocumentsGallery from "../../../components/ui/tabs/DocumentsGallery";

export default function StudentProfile() {
  const [activeTab, setActiveTab] = useState("dados");

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-4">Perfil do Aluno</h3>

          {/* Abas */}
          <ul className="nav nav-tabs">
            {[
              ["dados", "Dados"],
              ["historico", "Histórico"],
              ["notas", "Notas"],
              ["frequencia", "Frequência"],
              ["mensalidades", "Mensalidades"],
            ].map(([key, label]) => (
              <li className="nav-item" key={key}>
                <button
                  className={`nav-link ${
                    activeTab === key ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* Conteúdo */}
          <div className="tab-content mt-4">
            {activeTab === "dados" && <StudentData />}
            {activeTab === "historico" && <AcademicTimeline />}
            {activeTab === "notas" && <Grades />}
            {activeTab === "frequencia" && <Attendance />}
            {activeTab === "mensalidades" && <PaymentsHistory />}
          </div>

          {/* Galeria sempre visível */}
          <DocumentsGallery />
        </div>
      </div>
    </div>
  );
}