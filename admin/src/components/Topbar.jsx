import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { IconMenu, IconLogout } from './icons'
import './Topbar.css'

export default function Topbar({ title, onMenuClick }) {
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const email = user?.email ?? ''
  const initial = email ? email[0].toUpperCase() : '?'

  async function handleSignOut() {
    setIsSigningOut(true)
    const { error } = await signOut()
    if (error) {
      console.error('Não foi possível encerrar a sessão do Supabase.', error)
      setIsSigningOut(false)
    }
  }

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
        <button
          type="button"
          className="btn btn--ghost topbar__logout"
          onClick={handleSignOut}
          disabled={isSigningOut}
        >
          <IconLogout size={17} />
          {isSigningOut ? 'Saindo…' : 'Sair'}
        </button>
      </div>
    </header>
  )
}
