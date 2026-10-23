import { useMemo, useState } from 'react'
import PageBase from '../../layout/PageBase/PageBase'

const initialExpenses = [
    { id: 1, date: '2026-10-03', category: 'Material escolar', description: 'Papel e consumíveis de impressão', amount: 48500, method: 'Transferência' },
    { id: 2, date: '2026-10-08', category: 'Água e energia', description: 'Consumo do mês', amount: 73500, method: 'Banco' },
    { id: 3, date: '2026-10-15', category: 'Manutenção', description: 'Reparação de carteiras', amount: 32000, method: 'Dinheiro' },
]

const formatMoney = (amount) => `${new Intl.NumberFormat('pt-AO').format(amount)},00 Kz`

export default function Expenses() {
    const [expenses, setExpenses] = useState(initialExpenses)
    const [categoryFilter, setCategoryFilter] = useState('Todas')
    const [error, setError] = useState('')
    const categories = [...new Set(expenses.map((expense) => expense.category))]
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const visibleExpenses = useMemo(() => categoryFilter === 'Todas'
        ? expenses
        : expenses.filter((expense) => expense.category === categoryFilter), [categoryFilter, expenses])

    const addExpense = (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const amount = Number(formData.get('amount'))
        if (!Number.isFinite(amount) || amount <= 0) {
            setError('Informe um valor de despesa maior que zero.')
            return
        }
        setExpenses((current) => [{
            id: Date.now(),
            date: formData.get('date'),
            category: formData.get('category').trim(),
            description: formData.get('description').trim(),
            amount,
            method: formData.get('method'),
        }, ...current])
        event.currentTarget.reset()
        setError('')
    }

    return (
        <PageBase title="Despesas">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div className="panel panel-default">
                            <div className="panel-heading"><strong>Registar despesa</strong></div>
                            <div className="panel-body">
                                <form onSubmit={addExpense}>
                                    <div className="form-group">
                                        <label htmlFor="expense-date">Data</label>
                                        <input id="expense-date" className="form-control" type="date" name="date" defaultValue="2026-10-22" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expense-category">Categoria</label>
                                        <input id="expense-category" className="form-control" name="category" placeholder="Ex.: Material escolar" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expense-description">Descrição</label>
                                        <input id="expense-description" className="form-control" name="description" placeholder="Detalhes da despesa" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expense-amount">Valor (Kz)</label>
                                        <input id="expense-amount" className="form-control" type="number" name="amount" min="1" step="1" placeholder="0" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expense-method">Forma de pagamento</label>
                                        <select id="expense-method" className="form-control" name="method" defaultValue="Banco">
                                            <option>Banco</option>
                                            <option>Transferência</option>
                                            <option>Dinheiro</option>
                                        </select>
                                    </div>
                                    {error && <p role="alert" className="text-danger">{error}</p>}
                                    <button type="submit" className="btn btn-primary">Registar despesa</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="panel panel-default">
                            <div className="panel-heading clearfix">
                                <strong className="pull-left">Despesas registadas · {expenses.length}</strong>
                                <select aria-label="Filtrar despesas por categoria" className="form-control input-sm pull-right" style={{ width: 190 }} value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
                                    <option>Todas</option>
                                    {categories.map((category) => <option key={category}>{category}</option>)}
                                </select>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead><tr><th>Data</th><th>Categoria</th><th>Descrição</th><th>Pagamento</th><th className="text-right">Valor</th></tr></thead>
                                    <tbody>
                                        {visibleExpenses.map((expense) => (
                                            <tr key={expense.id}>
                                                <td>{new Date(`${expense.date}T00:00:00`).toLocaleDateString('pt-PT')}</td>
                                                <td>{expense.category}</td>
                                                <td>{expense.description}</td>
                                                <td>{expense.method}</td>
                                                <td className="text-right">{formatMoney(expense.amount)}</td>
                                            </tr>
                                        ))}
                                        {!visibleExpenses.length && <tr><td colSpan="5" className="text-center text-muted">Nenhuma despesa nesta categoria.</td></tr>}
                                    </tbody>
                                    <tfoot><tr><th colSpan="4">Total registado</th><th className="text-right">{formatMoney(total)}</th></tr></tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="text-muted"><small>Dados demonstrativos para Outubro de 2026.</small></p>
            </div>
        </PageBase>
    )
}
