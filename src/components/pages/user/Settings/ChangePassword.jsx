import { Input } from "../../../Input/input";
import Button from "../../../Button/button";

export default function ChangePassword() {
  return (
    <div className="card bg-white border border-secondary">
      <div className="card-body">
        <h5 className="text-center mb-4">Alterar senha</h5>

        <form>
          <Input label="Senha atual" type="password" />
          <Input label="Nova senha" type="password" />
          <Input
            label="Confirmar nova senha"
            type="password"
            error="As senhas não coincidem"
          />

          <div className="d-flex justify-content-center mt-3">
            <Button variant="warning" className="px-4">
              Alterar senha
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
