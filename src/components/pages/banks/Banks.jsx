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

    const filteredData =
        filter === "Todos"
            ? data
            : data.filter(b => b.estado === filter)

    const addBank = (bank) => {
        setData([...data, bank])
    }
    return (
        <PageBase title="Bancos">
            <div className='container mt-4'>

                {/* FILTROS */}
                <BankFilters filter={filter} setFilter={setFilter} />

                <button
                    className='btn btn-primary'
                    onClick={() => setShowModal(true)}
                >
                    + Novo Banco
                </button>

                {/**TABELA */}
                <BankTable data={filteredData} />

                {/** MODAL */}
                <BankModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={addBank}
                />
            </div>
        </PageBase>
    )
}