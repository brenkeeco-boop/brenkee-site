import { useState } from 'react'
import { mockOrcamentos, STATUS_ORCAMENTO } from '../../data/mockData'
import StatusBadge from '../../components/StatusBadge'
import './Orcamentos.css'

// TODO (Tópico 6+): substituir por leitura/gravação reais na tabela de
// orçamentos do Supabase. A troca de status abaixo é só local por enquanto.
export default function Orcamentos() {
  const [orcamentos, setOrcamentos] = useState(mockOrcamentos)

  function updateStatus(id, status) {
    setOrcamentos((list) => list.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Orçamentos</h1>
          <p>Solicitações recebidas pelo formulário "Solicitar orçamento" do site.</p>
        </div>
      </div>

      {orcamentos.length === 0 ? (
        <div className="empty-state card">
          <h3>Nenhum orçamento recebido ainda</h3>
          <p>As solicitações do site vão aparecer aqui.</p>
        </div>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ramo</th>
                <th>Contato</th>
                <th className="is-wrap">Mensagem</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orcamentos.map((o) => (
                <tr key={o.id}>
                  <td>{o.nome}</td>
                  <td>{o.ramo}</td>
                  <td>{o.contato}</td>
                  <td className="is-wrap orcamentos__mensagem">{o.mensagem}</td>
                  <td>
                    <div className="orcamentos__status">
                      <StatusBadge status={o.status} />
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        aria-label={`Alterar status de ${o.nome}`}
                      >
                        {STATUS_ORCAMENTO.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
