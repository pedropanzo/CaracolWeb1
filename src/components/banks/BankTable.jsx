export default function BankTable({ data, onEdit, onToggleStatus }){
    return (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>Beneficiário</th>
                        <th>Banco</th>
                        <th>Número da conta</th>
                        <th>IBAN</th>
                        <th>Estado</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length ? data.map(item => (
                        <tr key={item.id}>
                            <td>{item.beneficiario}</td>
                            <td>{item.banco}</td>
                            <td>{item.numero}</td>
                            <td>{item.iban}</td>
                            <td><span className={`label ${item.estado === 'Activo' ? 'label-success' : 'label-default'}`}>{item.estado}</span></td>
                            <td>
                                <button type="button" className="btn btn-xs btn-default" onClick={() => onEdit(item)}>Editar</button>{' '}
                                <button type="button" className="btn btn-xs btn-default" onClick={() => onToggleStatus(item)}>{item.estado === 'Activo' ? 'Bloquear' : 'Activar'}</button>
                            </td>
                        </tr>
                    )) : <tr><td colSpan="6" className="text-center text-muted">Nenhuma conta bancária nesta visualização.</td></tr>}
                </tbody>
            </table>
        </div>
    )
}