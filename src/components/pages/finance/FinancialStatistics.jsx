import PageBase from '../../Layout/PageBase/PageBase'

const monthlySummary = [
    { month: 'Mai', income: 2780000, expenses: 1360000 },
    { month: 'Jun', income: 3050000, expenses: 1490000 },
    { month: 'Jul', income: 2610000, expenses: 1280000 },
    { month: 'Ago', income: 3290000, expenses: 1570000 },
    { month: 'Set', income: 3540000, expenses: 1630000 },
    { month: 'Out', income: 3820000, expenses: 1720000 },
]

const recentPayments = [
    { id: 'PG-2601', student: 'Aldair Dala Gunza', description: 'Mensalidade · Outubro', amount: 15000, status: 'Pago' },
    { id: 'PG-2598', student: 'Anabela Eliandra Kizua', description: 'Matrícula', amount: 12000, status: 'Pago' },
    { id: 'PG-2592', student: 'Andreia Mariela André', description: 'Mensalidade · Outubro', amount: 15000, status: 'Pendente' },
    { id: 'PG-2587', student: 'Amado Josué Ezequiel', description: 'Transporte', amount: 10000, status: 'Pago' },
]

const formatMoney = (amount) => `${new Intl.NumberFormat('pt-AO').format(amount)},00 Kz`
const incomeTotal = monthlySummary.reduce((sum, month) => sum + month.income, 0)
const expensesTotal = monthlySummary.reduce((sum, month) => sum + month.expenses, 0)
const maxAmount = Math.max(...monthlySummary.map((month) => month.income))

export default function FinancialStatistics() {
    const paidCount = recentPayments.filter((payment) => payment.status === 'Pago').length
    const pendingTotal = recentPayments.filter((payment) => payment.status === 'Pendente').reduce((sum, payment) => sum + payment.amount, 0)

    return (
        <PageBase title="Estatísticas financeiras">
            <div className="container-fluid">
                <div className="row">
                    {[
                        { label: 'Receitas · últimos 6 meses', value: incomeTotal, color: '#1c84c6' },
                        { label: 'Despesas · últimos 6 meses', value: expensesTotal, color: '#ed5565' },
                        { label: 'Saldo do período', value: incomeTotal - expensesTotal, color: '#1ab394' },
                        { label: 'Pagamentos pendentes', value: pendingTotal, color: '#f8ac59' },
                    ].map((card) => (
                        <div className="col-sm-6 col-lg-3" key={card.label}>
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <p className="text-muted">{card.label}</p>
                                    <h3 style={{ color: card.color, margin: 0 }}>{formatMoney(card.value)}</h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="row">
                    <div className="col-md-7">
                        <div className="panel panel-default">
                            <div className="panel-heading"><strong>Receitas e despesas por mês</strong></div>
                            <div className="panel-body">
                                {monthlySummary.map((month) => (
                                    <div key={month.month} style={{ display: 'grid', gridTemplateColumns: '38px 1fr 120px', alignItems: 'center', gap: 10, marginBottom: 15 }}>
                                        <strong>{month.month}</strong>
                                        <div>
                                            <div title={`Receitas: ${formatMoney(month.income)}`} style={{ height: 12, width: `${(month.income / maxAmount) * 100}%`, background: '#1c84c6', borderRadius: 3, marginBottom: 5 }} />
                                            <div title={`Despesas: ${formatMoney(month.expenses)}`} style={{ height: 8, width: `${(month.expenses / maxAmount) * 100}%`, background: '#ed5565', borderRadius: 3 }} />
                                        </div>
                                        <small className="text-right">{formatMoney(month.income)}</small>
                                    </div>
                                ))}
                                <div className="text-muted"><span style={{ color: '#1c84c6' }}>■</span> Receitas <span style={{ color: '#ed5565', marginLeft: 15 }}>■</span> Despesas</div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="panel panel-default">
                            <div className="panel-heading"><strong>Resumo de cobranças</strong></div>
                            <div className="panel-body">
                                <p><strong>{paidCount}</strong> de {recentPayments.length} cobranças pagas</p>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-success" role="progressbar" aria-valuenow={Math.round((paidCount / recentPayments.length) * 100)} aria-valuemin="0" aria-valuemax="100" style={{ width: `${(paidCount / recentPayments.length) * 100}%` }}>
                                        {Math.round((paidCount / recentPayments.length) * 100)}%
                                    </div>
                                </div>
                                <p className="text-muted">Registos demonstrativos · Outubro de 2026</p>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-hover">
                                    <thead><tr><th>Aluno</th><th>Referência</th><th>Valor</th><th>Estado</th></tr></thead>
                                    <tbody>{recentPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td>{payment.student}</td>
                                            <td>{payment.description}</td>
                                            <td>{formatMoney(payment.amount)}</td>
                                            <td><span className={`label ${payment.status === 'Pago' ? 'label-success' : 'label-warning'}`}>{payment.status}</span></td>
                                        </tr>
                                    ))}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-muted"><small>Valores de demonstração em kwanzas (Kz).</small></p>
            </div>
        </PageBase>
    )
}
