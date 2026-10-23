import EmergencyContacts from "./emergencycontacts";

export default function StudentData() {
  return (
    <div className="row">
      <div className="col-md-6">
        <h5>Dados Pessoais</h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Nome:</strong> Elias Bernardo
          </li>
          <li className="list-group-item">
            <strong>Curso:</strong> Engenharia Informática
          </li>
          <li className="list-group-item">
            <strong>Matrícula:</strong> 2022A001
          </li>
        </ul>
      </div>

      <div className="col-md-6">
        <EmergencyContacts />
      </div>
    </div>
  );
}