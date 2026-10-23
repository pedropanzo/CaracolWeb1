export default function SuspensionHeader({
    mode,
    onModeChange,
    search,
    onSearchChange,
    activeCount,
    suspendedCount,
    onOpenForm,
}) {
    return (
        <div className="row align-items-center mb-3">
            <div className="col-md-5 mb-2">
                <input
                    type="search"
                    className="form-control"
                    placeholder="Pesquisar por nome, matrícula ou BI..."
                    aria-label="Pesquisar alunos"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                />
            </div>
            <div className="col-md-4 mb-2">
                <div className="btn-group" role="group" aria-label="Filtrar por situação">
                    <button
                        type="button"
                        className={`btn ${mode === "activos" ? "btn-primary" : "btn-default"}`}
                        onClick={() => onModeChange("activos")}
                    >
                        Activos ({activeCount})
                    </button>
                    <button
                        type="button"
                        className={`btn ${mode === "suspensos" ? "btn-primary" : "btn-default"}`}
                        onClick={() => onModeChange("suspensos")}
                    >
                        Suspensos ({suspendedCount})
                    </button>
                </div>
            </div>
            <div className="col-md-3 text-right mb-2">
                <button type="button" className="btn btn-danger" onClick={onOpenForm}>
                    <i className="fa fa-ban" aria-hidden="true" /> Suspender aluno
                </button>
            </div>
        </div>
    );
}
