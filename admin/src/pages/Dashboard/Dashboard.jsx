import StatCard from '../../components/StatCard'
import { IconProjetos, IconOrcamentos, IconClientes } from '../../components/icons'
import { mockProjetos, mockOrcamentos, mockClientes } from '../../data/mockData'
import './Dashboard.css'

export default function Dashboard() {
  // TODO (Tópico 6+): substituir pelas contagens reais das tabelas do Supabase.
  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral do painel. Os números abaixo ainda são dados de exemplo.</p>
        </div>
      </div>

      <div className="dashboard__grid">
        <StatCard label="Projetos" value={mockProjetos.length} Icon={IconProjetos} />
        <StatCard label="Orçamentos recebidos" value={mockOrcamentos.length} Icon={IconOrcamentos} />
        <StatCard label="Clientes cadastrados" value={mockClientes.length} Icon={IconClientes} />
      </div>
    </div>
  )
}
