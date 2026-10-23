import { Input } from "../../../Input/input";
import Button from "../../../Button/button";

export default function ProfileForm() {
  return (
    <div className="card bg-white border border-secondary h-100">
      <div className="card-body">
        <h5 className="text-center mb-4">Informações pessoais</h5>

        <form>
          <Input label="Nome" placeholder="Digite seu nome" />
          <Input label="Email" type="email" placeholder="email@exemplo.com" />

          <div className="d-flex justify-content-center mt-3">
            <Button variant="secondary" className="px-4">
              Salvar alterações
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
