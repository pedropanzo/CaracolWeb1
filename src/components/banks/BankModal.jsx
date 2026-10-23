import { useState } from 'react'

const emptyForm = { beneficiario: '', numero: '', banco: '', iban: '' }

export default function BankModal({ show, onClose, onSave, bank }) {
    const [form, setForm] = useState(() => bank ? {
            beneficiario: bank.beneficiario,
            numero: bank.numero,
            banco: bank.banco,
            iban: bank.iban,
        } : emptyForm)

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onSave({ ...form, id: bank?.id ?? Date.now(), estado: bank?.estado ?? 'Activo' })
        onClose()
    }

    if (!show) return null

    return (
        <div className="modal d-block" role="dialog" aria-modal="true" aria-labelledby="bank-modal-title" style={{ background: 'rgba(0, 0, 0, .5)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg">
                <form className="modal-content" onSubmit={handleSubmit}>
                    <div className="modal-header">
                        <button type="button" className="close" aria-label="Fechar" onClick={onClose}><span aria-hidden="true">&times;</span></button>
                        <h4 id="bank-modal-title" className="modal-title">{bank ? 'Editar conta bancária' : 'Cadastrar banco'}</h4>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-sm-6 form-group">
                                <label htmlFor="bank-beneficiario">Beneficiário</label>
                                <input id="bank-beneficiario" name="beneficiario" className="form-control" value={form.beneficiario} onChange={handleChange} required />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="bank-numero">Número da conta</label>
                                <input id="bank-numero" name="numero" className="form-control" value={form.numero} onChange={handleChange} required />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="bank-banco">Banco</label>
                                <input id="bank-banco" name="banco" className="form-control" value={form.banco} onChange={handleChange} required />
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="bank-iban">IBAN</label>
                                <input id="bank-iban" name="iban" className="form-control" value={form.iban} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-default" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">{bank ? 'Guardar alterações' : 'Cadastrar banco'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}