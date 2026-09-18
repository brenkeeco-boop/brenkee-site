import { useState } from 'react'
import Modal from '../../components/Modal'

const CATEGORIAS = ['Site institucional', 'Agendamento', 'E-commerce', 'Cardápio digital', 'Personalizado']

export default function ProjetoForm({ projeto, onClose, onSave }) {
  const isEdit = Boolean(projeto)
  const [form, setForm] = useState(
    projeto ?? { nome: '', descricao: '', categoria: CATEGORIAS[0], link: '', imagem: '' }
  )

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSave({ ...form, id: projeto?.id })
  }

  return (
    <Modal title={isEdit ? 'Editar projeto' : 'Novo projeto'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="p-nome">Nome do projeto</label>
          <input
            id="p-nome"
            value={form.nome}
            onChange={(e) => update('nome', e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="p-descricao">Descrição</label>
          <textarea
            id="p-descricao"
            value={form.descricao}
            onChange={(e) => update('descricao', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="p-categoria">Categoria</label>
            <select
              id="p-categoria"
              value={form.categoria}
              onChange={(e) => update('categoria', e.target.value)}
            >
              {CATEGORIAS.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="p-link">Link do site</label>
            <input
              id="p-link"
              type="url"
              placeholder="https://"
              value={form.link}
              onChange={(e) => update('link', e.target.value)}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="p-imagem">Imagem</label>
          <input id="p-imagem" type="file" accept="image/*" />
          <p className="form-field--hint">Upload real será conectado ao Storage do Supabase em um próximo tópico.</p>
        </div>

        <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
          {isEdit ? 'Salvar alterações' : 'Adicionar projeto'}
        </button>
      </form>
    </Modal>
  )
}
