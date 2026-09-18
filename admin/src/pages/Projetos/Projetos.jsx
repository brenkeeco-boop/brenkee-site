import { useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { IconPlus, IconEdit, IconTrash, IconLink } from '../../components/icons'
import ProjetoForm from './ProjetoForm'
import './Projetos.css'

const PROJECT_FIELDS = 'id, nome, cliente_id, categoria, descricao, imagem, link, criado_em'

export default function Projetos() {
  const [projetos, setProjetos] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingClientes, setLoadingClientes] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [clientesError, setClientesError] = useState('')
  const [success, setSuccess] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editando, setEditando] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const loadProjetos = useCallback(async () => {
    setLoading(true)
    setLoadError('')

    const { data, error } = await supabase
      .from('projetos')
      .select(PROJECT_FIELDS)
      .order('criado_em', { ascending: false })

    if (error) {
      setLoadError('Não foi possível carregar os projetos. Tente novamente.')
    } else {
      setProjetos(data ?? [])
    }

    setLoading(false)
  }, [])

  const loadClientes = useCallback(async () => {
    setLoadingClientes(true)
    setClientesError('')

    // Usa apenas a chave referenciada por projetos.cliente_id.
    const { data, error } = await supabase.from('clientes').select('id')

    if (error) {
      setClientesError('Não foi possível carregar os clientes para seleção.')
    } else {
      setClientes(data ?? [])
    }

    setLoadingClientes(false)
  }, [])

  useEffect(() => {
    loadProjetos()
    loadClientes()
  }, [loadProjetos, loadClientes])

  function openNewProject() {
    setSuccess('')
    setEditando(null)
    setFormOpen(true)
  }

  function openEditProject(projeto) {
    setSuccess('')
    setEditando(projeto)
    setFormOpen(true)
  }

  function closeForm() {
    if (saving) return
    setFormOpen(false)
    setEditando(null)
  }

  async function handleSave(projeto) {
    setSaving(true)
    setSuccess('')

    const payload = {
      nome: projeto.nome.trim(),
      cliente_id: projeto.cliente_id || null,
      categoria: projeto.categoria || null,
      descricao: projeto.descricao.trim() || null,
      imagem: projeto.imagem.trim() || null,
      link: projeto.link.trim() || null,
    }

    const query = projeto.id
      ? supabase.from('projetos').update(payload).eq('id', projeto.id)
      : supabase.from('projetos').insert(payload)

    const { error } = await query
    if (error) {
      setSaving(false)
      return { error: 'Não foi possível salvar o projeto. Revise os dados e tente novamente.' }
    }

    await loadProjetos()
    setSaving(false)
    setFormOpen(false)
    setEditando(null)
    setSuccess(projeto.id ? 'Projeto atualizado com sucesso.' : 'Projeto adicionado com sucesso.')
    return { error: null }
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover este projeto permanentemente?')) return

    setDeletingId(id)
    setSuccess('')
    const { error } = await supabase.from('projetos').delete().eq('id', id)

    if (error) {
      setLoadError('Não foi possível excluir o projeto. Tente novamente.')
    } else {
      await loadProjetos()
      setSuccess('Projeto excluído com sucesso.')
    }

    setDeletingId(null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Projetos</h1>
          <p>Projetos exibidos no site público da Brenkee.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openNewProject} disabled={loading}>
          <IconPlus size={17} />
          Novo projeto
        </button>
      </div>

      {success && <div className="form-success" role="status">{success}</div>}
      {loadError && (
        <div className="form-error" role="alert">
          {loadError}{' '}
          <button type="button" className="btn btn--ghost btn--sm" onClick={loadProjetos}>Tentar novamente</button>
        </div>
      )}

      {loading ? (
        <div className="empty-state card"><p>Carregando projetos…</p></div>
      ) : projetos.length === 0 ? (
        <div className="empty-state card">
          <h3>Nenhum projeto cadastrado ainda</h3>
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
                {p.categoria && <span className="projeto-card__categoria">{p.categoria}</span>}
                <h3>{p.nome}</h3>
                {p.descricao && <p>{p.descricao}</p>}
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="projeto-card__link">
                    <IconLink size={14} /> Ver site
                  </a>
                )}
              </div>
              <div className="projeto-card__actions">
                <button type="button" className="btn btn--icon" onClick={() => openEditProject(p)} aria-label="Editar projeto" disabled={deletingId === p.id}>
                  <IconEdit size={16} />
                </button>
                <button type="button" className="btn btn--icon btn--danger" onClick={() => handleDelete(p.id)} aria-label="Excluir projeto" disabled={deletingId === p.id}>
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
          clientes={clientes}
          loadingClientes={loadingClientes}
          clientesError={clientesError}
          saving={saving}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
