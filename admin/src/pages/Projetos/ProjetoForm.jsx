import { useState } from 'react'
import Modal from '../../components/Modal'

const CATEGORIAS = ['Site institucional', 'Agendamento', 'E-commerce', 'Cardápio digital', 'Personalizado']

export default function ProjetoForm({
  projeto,
  clientes,
  loadingClientes,
  clientesError,
  saving,
  onClose,
  onSave,
}) {
  const isEdit = Boolean(projeto)
  const [form, setForm] = useState(
    projeto ?? { nome: '', cliente_id: '', descricao: '', categoria: CATEGORIAS[0], link: '', imagem: '' }
  )
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.nome.trim()) {
      setError('Informe o nome do projeto.')
      return
    }

    const result = await onSave({ ...form, id: projeto?.id })
    if (result.error) setError(result.error)
  }

  return (
    <Modal title={isEdit ? 'Editar projeto' : 'Novo projeto'} onClose={saving ? () => {} : onClose}>
      <form onSubmit={handleSubmit}>
        {error && <div className="form-error" role="alert">{error}</div>}

        <div className="form-field">
          <label htmlFor="p-nome">Nome do projeto</label>
          <input id="p-nome" value={form.nome} onChange={(e) => update('nome', e.target.value)} required disabled={saving} />
        </div>

        <div className="form-field">
          <label htmlFor="p-cliente">Cliente</label>
          <select id="p-cliente" value={form.cliente_id ?? ''} onChange={(e) => update('cliente_id', e.target.value)} disabled={saving || loadingClientes || Boolean(clientesError)}>
            <option value="">{loadingClientes ? 'Carregando clientes…' : 'Sem cliente vinculado'}</option>
            {clientes.map((cliente) => <option key={cliente.id} value={cliente.id}>{cliente.id}</option>)}
          </select>
          {clientesError && <p className="form-field--hint">{clientesError}</p>}
        </div>

        <div className="form-field">
          <label htmlFor="p-descricao">Descrição</label>
          <textarea id="p-descricao" value={form.descricao ?? ''} onChange={(e) => update('descricao', e.target.value)} disabled={saving} />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="p-categoria">Categoria</label>
            <select id="p-categoria" value={form.categoria ?? ''} onChange={(e) => update('categoria', e.target.value)} disabled={saving}>
              <option value="">Sem categoria</option>
              {CATEGORIAS.map((categoria) => <option key={categoria} value={categoria}>{categoria}</option>)}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="p-link">Link do site</label>
            <input id="p-link" type="url" placeholder="https://" value={form.link ?? ''} onChange={(e) => update('link', e.target.value)} disabled={saving} />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="p-imagem">URL da imagem</label>
          <input id="p-imagem" type="url" placeholder="https://" value={form.imagem ?? ''} onChange={(e) => update('imagem', e.target.value)} disabled={saving} />
          <p className="form-field--hint">Informe uma URL de imagem. O upload para Storage será tratado posteriormente.</p>
        </div>

        <button type="submit" className="btn btn--primary" style={{ width: '100%' }} disabled={saving}>
          {saving ? 'Salvando…' : isEdit ? 'Salvar alterações' : 'Adicionar projeto'}
        </button>
      </form>
    </Modal>
  )
}
