export default function ValuesTable({ data }) {
    return (
        <div className="table-responsive">
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Aluno</th>
                        <th className="text-right">Valor acumulado</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td className="text-right">{new Intl.NumberFormat('pt-AO').format(item.value)},00 Kz</td>
                        </tr>
                    ))}
                    {!data.length && <tr><td colSpan="3" className="text-center text-muted">Nenhum aluno encontrado.</td></tr>}
                </tbody>
            </table>
        </div>
    )
}