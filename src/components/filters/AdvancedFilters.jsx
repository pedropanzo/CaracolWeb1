export default function AdvancedFilters({ onChange }) {
    function handleFilterChange(name, value) {
        onChange(prev => ({ ...prev, [name]: value }));
    }
    return (
        <div className="row g-3 mb-3">
            <div className="col-md-3">
                <select className="form-select" onChange={(e) => handleFilterChange('status', e.target.value)}>
                    <option value="">Status</option>
                    <option value="Activo">Activo</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Suspenso">Suspenso</option>
                    <option value="Desistente">Desistente</option>
                </select>
            </div>
            <div className="col-md-3">
                <select className="form-select" onChange={(e) => handleFilterChange('periodo', e.target.value)}>
                    <option value="">Período</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                </select>
            </div>
        </div>
    );
}