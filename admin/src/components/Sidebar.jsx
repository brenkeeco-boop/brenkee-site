import { NavLink } from 'react-router-dom'
import {
  IconDashboard,
  IconProjetos,
  IconOrcamentos,
  IconClientes,
  IconConteudo,
  IconConfiguracoes,
  IconUsuarios,
  IconClose,
} from './icons'
import './Sidebar.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', Icon: IconDashboard },
  { to: '/projetos', label: 'Projetos', Icon: IconProjetos },
  { to: '/orcamentos', label: 'Orçamentos', Icon: IconOrcamentos },
  { to: '/clientes', label: 'Clientes', Icon: IconClientes },
  { to: '/conteudo', label: 'Conteúdo do site', Icon: IconConteudo },
  { to: '/configuracoes', label: 'Configurações', Icon: IconConfiguracoes },
  { to: '/usuarios', label: 'Usuários', Icon: IconUsuarios },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="sidebar__header">
          <span className="sidebar__logo">
            <span className="sidebar__logo-mark">B</span>
            Brenkee
          </span>
          <button
            type="button"
            className="btn btn--icon sidebar__close"
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <IconClose size={20} />
          </button>
        </div>

        <nav className="sidebar__nav" aria-label="Navegação do painel">
          <ul>
            {NAV_ITEMS.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  onClick={onClose}
                  className={({ isActive }) => `sidebar__link ${isActive ? 'is-active' : ''}`}
                >
                  <Icon size={18} />
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isOpen && <div className="sidebar__overlay" onClick={onClose} aria-hidden="true" />}
    </>
  )
}
