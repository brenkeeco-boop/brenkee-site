import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Login.css'

export default function Login() {
  const { session, loading: authLoading, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (authLoading) return <div className="route-loading">Carregando…</div>

  // Já logado? Não faz sentido mostrar o login de novo.
  if (session) return <Navigate to="/dashboard" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await signIn(email, password)

    setLoading(false)
    if (error) {
      setError('E-mail ou senha inválidos.')
      return
    }
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login">
      <div className="login__card card">
        <div className="login__brand">
          <span className="login__logo-mark">B</span>
          <span>Brenkee</span>
        </div>
        <p className="login__subtitle">Painel administrativo</p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <div className="form-error">{error}</div>}

          <div className="form-field">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary login__submit" disabled={loading}>
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
