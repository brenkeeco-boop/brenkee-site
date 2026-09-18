import { mockUsuarios } from '../../data/mockData'

// TODO (Tópico 6+): listar os usuários reais do Supabase Auth (cada um com
// login próprio — Kelve e Brenda) e permitir convidar/gerenciar por aqui.
export default function Usuarios() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Usuários</h1>
          <p>Quem tem acesso ao painel administrativo da Brenkee.</p>
        </div>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Papel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockUsuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.nome}</td>
                <td>{u.papel}</td>
                <td>{u.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
