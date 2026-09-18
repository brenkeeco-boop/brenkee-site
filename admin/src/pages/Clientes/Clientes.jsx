import { useState, Fragment } from 'react'
import { mockClientes } from '../../data/mockData'
import { IconPlus, IconEdit, IconEye } from '../../components/icons'
import './Clientes.css'

// TODO (Tópico 6+): conectar à tabela de clientes real do Supabase
// (e à relação cliente → projetos, quando essa tabela existir).
export default function Clientes() {
  const [clientes] = useState(mockClientes)
  const [expandido, setExpandido] = useState(null)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Clientes</h1>
          <p>Negócios atendidos pela Brenkee e os projetos relacionados a cada um.</p>
        </div>
        <button type="button" className="btn btn--primary">
          <IconPlus size={17} />
          Novo cliente
        </button>
      </div>

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
            {clientes.map((c) => (
              <Fragment key={c.id}>
                <tr>
                  <td>{c.nome}</td>
                  <td>{c.negocio}</td>
                  <td>{c.contato}</td>
                  <td>{c.projetos.length}</td>
                  <td>
                    <div className="clientes__actions">
                      <button
                        type="button"
                        className="btn btn--icon"
                        onClick={() => setExpandido(expandido === c.id ? null : c.id)}
                        aria-label="Ver projetos relacionados"
                      >
                        <IconEye size={16} />
                      </button>
                      <button type="button" className="btn btn--icon" aria-label="Editar cliente">
                        <IconEdit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandido === c.id && (
                  <tr className="clientes__detalhe-row">
                    <td colSpan={5}>
                      <div className="clientes__detalhe">
                        <strong>Projetos de {c.nome}:</strong>{' '}
                        {c.projetos.join(', ')}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
