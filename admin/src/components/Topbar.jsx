import { useAuth } from '../context/AuthContext'
import { IconMenu, IconLogout } from './icons'
import './Topbar.css'

export default function Topbar({ title, onMenuClick }) {
  const { user, signOut } = useAuth()
  const email = user?.email ?? ''
  const initial = email ? email[0].toUpperCase() : '?'

  return (
    <header className="topbar">
      <div className="topbar__left">
        <button
          type="button"
          className="btn btn--icon topbar__menu"
          onClick={onMenuClick}
          aria-label="Abrir menu"
        >
          <IconMenu size={20} />
        </button>
        <h1 className="topbar__title">{title}</h1>
      </div>

      <div className="topbar__user">
        <span className="topbar__avatar">{initial}</span>
        <span className="topbar__email">{email}</span>
        <button type="button" className="btn btn--ghost topbar__logout" onClick={signOut}>
          <IconLogout size={17} />
          Sair
        </button>
      </div>
    </header>
  )
}
