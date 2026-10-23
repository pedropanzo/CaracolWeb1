import { useState } from 'react';
import { banksMock } from './banksMock';

import BankTable from '../../banks/BankTable';
import BankModal from '../../banks/BankModal';
import BankFilters from '../../banks/BankFilters';

import PageBase from '../../layout/PageBase/PageBase'

export default function Banks() {
    const [data, setData] = useState(banksMock)
    const [showModal, setShowModal] = useState(false)
    const [filter, setFilter] = useState("Activo")
    const [editingBank, setEditingBank] = useState(null)

    const filteredData =
        filter === "Todos"
            ? data
            : data.filter(b => b.estado === filter)

    const saveBank = (bank) => {
        setData((current) => editingBank
            ? current.map((item) => item.id === bank.id ? bank : item)
            : [...current, bank])
        setEditingBank(null)
    }
    const editBank = (bank) => {
        setEditingBank(bank)
        setShowModal(true)
    }
    const toggleStatus = (bank) => {
        setData((current) => current.map((item) => item.id === bank.id
            ? { ...item, estado: item.estado === 'Activo' ? 'Bloqueado' : 'Activo' }
            : item))
    }
    return (
        <PageBase title="Bancos">
            <div className='container mt-4'>
                <div className="clearfix" style={{ marginBottom: 15 }}>
                    <button
                        type="button"
                        className='btn btn-primary pull-right'
                        onClick={() => { setEditingBank(null); setShowModal(true); }}
                    >
                        + Novo Banco
                    </button>
                </div>
                <BankFilters filter={filter} setFilter={setFilter} />
                <BankTable data={filteredData} onEdit={editBank} onToggleStatus={toggleStatus} />
                <BankModal
                    key={`${showModal}-${editingBank?.id ?? 'new'}`}
                    show={showModal}
                    bank={editingBank}
                    onClose={() => { setShowModal(false); setEditingBank(null); }}
                    onSave={saveBank}
                />
            </div>
        </PageBase>
    )
}