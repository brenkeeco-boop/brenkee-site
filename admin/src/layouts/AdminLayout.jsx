import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import './AdminLayout.css'

const TITLES = {
  '/dashboard': 'Dashboard',
  '/projetos': 'Projetos',
  '/orcamentos': 'Orçamentos',
  '/clientes': 'Clientes',
  '/conteudo': 'Conteúdo do site',
  '/configuracoes': 'Configurações',
  '/usuarios': 'Usuários',
}

export default function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const title = TITLES[location.pathname] ?? 'Painel'

  return (
    <div className="admin-layout">
      <Sidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="admin-layout__main">
        <Topbar title={title} onMenuClick={() => setMenuOpen(true)} />
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
