export default function BankFilters({ filter, setFilter }){
    return (
        <div className="mb-3">
            <div className="row" style={{ padding: "10px", maxWidth: 500, margin: "0 auto" }}>
                <div className="col-xs-12">
                    <p className="text-center">Modo de visualização</p>
                </div>
                <div className="col-xs-4">
                    <input 
                        type="radio"
                        name="filter"
                        checked={filter === "Activo"}
                        onChange={() => setFilter("Activo")}
                    /> Ativos
                </div>
                <div className="col-xs-4">
                    <input 
                        type="radio"
                        name="filter"
                        checked={filter === "Bloqueado"}
                        onChange={() => setFilter("Bloqueado")}
                    /> Bloqueados
                </div>
                <div className="col-xs-4">
                    <input
                        type="radio"
                        name="filter"
                        checked={filter === "Todos"}
                        onChange={() => setFilter("Todos")}
                    /> Todos
                </div>
            </div>
        </div>
    )
}