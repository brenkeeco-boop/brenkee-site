import { useState } from 'react'
import { mockProjetos } from '../../data/mockData'
import { IconPlus, IconEdit, IconTrash, IconLink } from '../../components/icons'
import ProjetoForm from './ProjetoForm'
import './Projetos.css'

// TODO (Tópico 6+): trocar o estado local por dados reais da tabela de
// projetos no Supabase (select/insert/update/delete). Por ora, o
// adicionar/editar/excluir abaixo só altera este estado em memória.
export default function Projetos() {
  const [projetos, setProjetos] = useState(mockProjetos)
  const [formOpen, setFormOpen] = useState(false)
  const [editando, setEditando] = useState(null)

  function handleSave(projeto) {
    if (projeto.id) {
      setProjetos((list) => list.map((p) => (p.id === projeto.id ? projeto : p)))
    } else {
      setProjetos((list) => [...list, { ...projeto, id: Date.now() }])
    }
    setFormOpen(false)
    setEditando(null)
  }

  function handleDelete(id) {
    if (confirm('Remover este projeto da lista?')) {
      setProjetos((list) => list.filter((p) => p.id !== id))
    }
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Projetos</h1>
          <p>Projetos exibidos no site público da Brenkee.</p>
        </div>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => { setEditando(null); setFormOpen(true) }}
        >
          <IconPlus size={17} />
          Novo projeto
        </button>
      </div>

      {projetos.length === 0 ? (
        <div className="empty-state card">
          <h3>Nenhum projeto cadastrado</h3>
          <p>Clique em "Novo projeto" para adicionar o primeiro.</p>
        </div>
      ) : (
        <div className="projetos__grid">
          {projetos.map((p) => (
            <article key={p.id} className="projeto-card card">
              <div className="projeto-card__imagem">
                {p.imagem ? <img src={p.imagem} alt="" /> : <span>Sem imagem</span>}
              </div>
              <div className="projeto-card__body">
                <span className="projeto-card__categoria">{p.categoria}</span>
                <h3>{p.nome}</h3>
                <p>{p.descricao}</p>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="projeto-card__link">
                    <IconLink size={14} /> Ver site
                  </a>
                )}
              </div>
              <div className="projeto-card__actions">
                <button
                  type="button"
                  className="btn btn--icon"
                  onClick={() => { setEditando(p); setFormOpen(true) }}
                  aria-label="Editar projeto"
                >
                  <IconEdit size={16} />
                </button>
                <button
                  type="button"
                  className="btn btn--icon btn--danger"
                  onClick={() => handleDelete(p.id)}
                  aria-label="Excluir projeto"
                >
                  <IconTrash size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {formOpen && (
        <ProjetoForm
          projeto={editando}
          onClose={() => { setFormOpen(false); setEditando(null) }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
