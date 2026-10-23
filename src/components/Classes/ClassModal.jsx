import { useState } from "react";

const emptyClass = { name: "", type: "" };
const emptyTurma = { turma: "", periodo: "", lotacao: "", sala: "" };

export default function ClassModal({
  show = true,
  onClose,
  onSave,
  editing,
  addClass,
  close,
}) {
  const isTurmaForm = typeof addClass === "function";
  const dismiss = onClose || close;
  const [form, setForm] = useState(() => {
    if (isTurmaForm) {
      return {
        ...emptyTurma,
        turma: editing?.turma ?? "",
        periodo: editing?.periodo ?? "",
        lotacao: editing?.lotacao ?? "",
        sala: editing?.sala ?? "",
      };
    }

    return {
        ...emptyClass,
        name: editing?.name ?? "",
        type: editing?.type ?? "",
    };
  });

  if (!show) return null;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isTurmaForm) {
      addClass({
        id: editing?.id ?? Date.now(),
        turma: form.turma,
        periodo: form.periodo,
        lotacao: Number(form.lotacao),
        sala: Number(form.sala),
      });
      dismiss?.();
      return;
    }

    onSave({ name: form.name, type: form.type });
    dismiss?.();
  };

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show d-block" role="dialog" aria-modal="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {isTurmaForm ? "Nova Turma" : editing ? "Editar Classe" : "Nova Classe"}
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Fechar"
                onClick={dismiss}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                {isTurmaForm ? (
                  <>
                    <label className="form-label" htmlFor="class-modal-turma">Turma</label>
                    <input
                      id="class-modal-turma"
                      className="form-control mb-3"
                      name="turma"
                      value={form.turma}
                      onChange={updateField}
                      required
                    />
                    <label className="form-label" htmlFor="class-modal-periodo">Período</label>
                    <input
                      id="class-modal-periodo"
                      className="form-control mb-3"
                      name="periodo"
                      value={form.periodo}
                      onChange={updateField}
                      required
                    />
                    <label className="form-label" htmlFor="class-modal-lotacao">Lotação</label>
                    <input
                      id="class-modal-lotacao"
                      className="form-control mb-3"
                      type="number"
                      min="0"
                      name="lotacao"
                      value={form.lotacao}
                      onChange={updateField}
                      required
                    />
                    <label className="form-label" htmlFor="class-modal-sala">Sala</label>
                    <input
                      id="class-modal-sala"
                      className="form-control"
                      type="number"
                      min="0"
                      name="sala"
                      value={form.sala}
                      onChange={updateField}
                      required
                    />
                  </>
                ) : (
                  <>
                    <label className="form-label" htmlFor="class-modal-name">Classe</label>
                    <input
                      id="class-modal-name"
                      className="form-control mb-3"
                      name="name"
                      value={form.name}
                      onChange={updateField}
                      required
                    />
                    <label className="form-label" htmlFor="class-modal-type">Tipo</label>
                    <input
                      id="class-modal-type"
                      className="form-control"
                      name="type"
                      value={form.type}
                      onChange={updateField}
                      required
                    />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={dismiss}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
