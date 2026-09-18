import { useState } from 'react'
import Modal from '../../components/Modal'

export default function ClienteForm({ cliente, saving, onClose, onSave }) {
  const isEdit = Boolean(cliente)
  const [form, setForm] = useState(
    cliente ?? { nome: '', empresa: '', telefone: '', email: '', observacoes: '' }
  )
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim()) {
      setError('Informe o nome do cliente.')
      return
    }

    const result = await onSave({ ...form, id: cliente?.id })
    if (result.error) setError(result.error)
  }

  return (
    <Modal title={isEdit ? 'Editar cliente' : 'Novo cliente'} onClose={saving ? () => {} : onClose}>
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error" role="alert">{error}</div>}

        <div className="form-field">
          <label htmlFor="c-nome">Nome</label>
          <input id="c-nome" value={form.nome ?? ''} onChange={(e) => update('nome', e.target.value)} required disabled={saving} />
        </div>

        <div className="form-field">
          <label htmlFor="c-empresa">Empresa</label>
          <input id="c-empresa" value={form.empresa ?? ''} onChange={(e) => update('empresa', e.target.value)} disabled={saving} />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="c-telefone">Telefone</label>
            <input id="c-telefone" type="tel" value={form.telefone ?? ''} onChange={(e) => update('telefone', e.target.value)} disabled={saving} />
          </div>
          <div className="form-field">
            <label htmlFor="c-email">E-mail</label>
            <input id="c-email" type="email" value={form.email ?? ''} onChange={(e) => update('email', e.target.value)} disabled={saving} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="c-observacoes">Observações</label>
          <textarea id="c-observacoes" value={form.observacoes ?? ''} onChange={(e) => update('observacoes', e.target.value)} disabled={saving} />
        </div>

        <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={saving}>
          {saving ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Adicionar cliente'}
        </button>
      </form>
    </Modal>
  )
}
