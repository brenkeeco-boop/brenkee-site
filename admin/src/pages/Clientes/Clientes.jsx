import { Fragment, useCallback, useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { IconPlus, IconEdit, IconEye, IconTrash, IconLink } from '../../components/icons'
import ClienteForm from './ClienteForm'
import './Clientes.css'

const CLIENT_FIELDS = 'id, nome, empresa, telefone, email, observacoes, criado_em'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [contagemProjetos, setContagemProjetos] = useState({})
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')
  const [success, setSuccess] = useState('')
  const [expandido, setExpandido] = useState(null)
  const [loadingProjetosId, setLoadingProjetosId] = useState(null)
  const [projetosRelacionados, setProjetosRelacionados] = useState([])
  const [projetosError, setProjetosError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editando, setEditando] = useState(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  const loadClientes = useCallback(async () => {
    setLoading(true)
    setLoadError('')

    const [clientesResposta, projetosResposta] = await Promise.all([
      supabase
        .from('clientes')
        .select(CLIENT_FIELDS)
        .order('criado_em', { ascending: false }),
      supabase.from('projetos').select('cliente_id'),
    ])

    if (clientesResposta.error) {
      setLoadError('Não foi possível carregar os clientes. Tente novamente.')
    } else {
      setClientes(clientesResposta.data ?? [])
    }

    if (projetosResposta.error) {
      setLoadError('Não foi possível carregar as relações de projetos. Tente novamente.')
      setContagemProjetos({})
    } else {
      const contagens = (projetosResposta.data ?? []).reduce((acumulado, projeto) => {
        if (projeto.cliente_id) {
          acumulado[projeto.cliente_id] = (acumulado[projeto.cliente_id] ?? 0) + 1
        }
        return acumulado
      }, {})
      setContagemProjetos(contagens)
    }

    setLoading(false)
  }, [])

  useEffect(() => {
    loadClientes()
  }, [loadClientes])

  function openNewClient() {
    setSuccess('')
    setEditando(null)
    setFormOpen(true)
  }

  function openEditClient(cliente) {
    setSuccess('')
    setEditando(cliente)
    setFormOpen(true)
  }

  function closeForm() {
    if (saving) return
    setFormOpen(false)
    setEditando(null)
  }

  async function handleSave(cliente) {
    setSaving(true)
    setSuccess('')

    const payload = {
      nome: cliente.nome.trim(),
      empresa: cliente.empresa.trim() || null,
      telefone: cliente.telefone.trim() || null,
      email: cliente.email.trim() || null,
      observacoes: cliente.observacoes.trim() || null,
    }

    const query = cliente.id
      ? supabase.from('clientes').update(payload).eq('id', cliente.id)
      : supabase.from('clientes').insert(payload)

    const { error } = await query
    if (error) {
      setSaving(false)
      return { error: 'Não foi possível salvar o cliente. Revise os dados e tente novamente.' }
    }

    await loadClientes()
    setSaving(false)
    setFormOpen(false)
    setEditando(null)
    setSuccess(cliente.id ? 'Cliente atualizado com sucesso.' : 'Cliente adicionado com sucesso.')
    return { error: null }
  }

  async function toggleProjetos(clienteId) {
    if (expandido === clienteId) {
      setExpandido(null)
      setProjetosError('')
      setProjetosRelacionados([])
      return
    }

    setExpandido(clienteId)
    setProjetosError('')

    setLoadingProjetosId(clienteId)
    const { data, error } = await supabase
      .from('projetos')
      .select('id, nome, descricao, categoria, imagem, link, criado_em')
      .eq('cliente_id', clienteId)
      .order('criado_em', { ascending: false })

    if (error) {
      setProjetosError('Não foi possível carregar os projetos relacionados.')
    } else {
      setProjetosRelacionados(data ?? [])
    }

    setLoadingProjetosId(null)
  }

  async function handleDelete(id) {
    if (!window.confirm('Remover este cliente permanentemente?')) return

    setDeletingId(id)
    setSuccess('')
    const { error } = await supabase.from('clientes').delete().eq('id', id)

    if (error) {
      setLoadError('Não foi possível excluir o cliente. Verifique se ele possui projetos vinculados e tente novamente.')
    } else {
      await loadClientes()
      setExpandido(null)
      setSuccess('Cliente excluído com sucesso.')
    }

    setDeletingId(null)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p>Negócios atendidos pela Brenkee e os projetos relacionados a cada um.</p>
        </div>
        <button type="button" className="btn btn--primary" onClick={openNewClient} disabled={loading}>
          <IconPlus size={17} />
          Novo cliente
        </button>
      </div>

      {success && <div className="form-success" role="status">{success}</div>}
      {loadError && (
        <div className="form-error" role="alert">
          {loadError}{' '}
          <button type="button" className="btn btn--ghost btn--sm" onClick={loadClientes}>Tentar novamente</button>
        </div>
      )}

      {loading ? (
        <div className="empty-state card"><p>Carregando clientes…</p></div>
      ) : clientes.length === 0 ? (
        <div className="empty-state card">
          <h3>Nenhum cliente cadastrado ainda</h3>
          <p>Clique em "Novo cliente" para adicionar o primeiro.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Negócio</th>
                <th>Contato</th>
                <th>Projetos</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => {
                const isExpanded = expandido === cliente.id

                return (
                  <Fragment key={cliente.id}>
                    <tr>
                      <td>{cliente.nome}</td>
                      <td>{cliente.empresa || '—'}</td>
                      <td>{cliente.telefone || cliente.email || '—'}</td>
                      <td>{contagemProjetos[cliente.id] ?? 0}</td>
                      <td>
                        <div className="clientes__actions">
                          <button type="button" className="btn btn--icon" onClick={() => toggleProjetos(cliente.id)} aria-label="Ver projetos relacionados" disabled={deletingId === cliente.id}>
                            <IconEye size={16} />
                          </button>
                          <button type="button" className="btn btn--icon" onClick={() => openEditClient(cliente)} aria-label="Editar cliente" disabled={deletingId === cliente.id}>
                            <IconEdit size={16} />
                          </button>
                          <button type="button" className="btn btn--icon btn--danger" onClick={() => handleDelete(cliente.id)} aria-label="Excluir cliente" disabled={deletingId === cliente.id}>
                            <IconTrash size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="clientes__detalhe-row">
                        <td colSpan={5}>
                          <div className="clientes__detalhe">
                            <strong>Projetos de {cliente.nome}:</strong>{' '}
                            {loadingProjetosId === cliente.id
                              ? 'Carregando…'
                              : projetosError
                                ? projetosError
                                : projetosRelacionados.length
                                  ? (
                                    <div className="clientes__projetos-lista">
                                      {projetosRelacionados.map((projeto) => (
                                        <article key={projeto.id} className="clientes__projeto">
                                          {projeto.imagem && <img src={projeto.imagem} alt="" className="clientes__projeto-imagem" />}
                                          <div>
                                            <strong>{projeto.nome}</strong>
                                            {projeto.categoria && <span className="clientes__projeto-categoria">{projeto.categoria}</span>}
                                            {projeto.descricao && <p>{projeto.descricao}</p>}
                                            {projeto.link && (
                                              <a href={projeto.link} target="_blank" rel="noopener noreferrer" className="clientes__projeto-link">
                                                <IconLink size={14} /> Ver projeto
                                              </a>
                                            )}
                                          </div>
                                        </article>
                                      ))}
                                    </div>
                                  )
                                  : 'Nenhum projeto relacionado.'}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <ClienteForm
          cliente={editando}
          saving={saving}
          onClose={closeForm}
          onSave={handleSave}
        />
      )}
    </div>
  )
}
