import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Bloqueia o acesso às páginas internas do painel para quem não tem uma
 * sessão válida no Supabase Auth. Enquanto a sessão inicial ainda está
 * sendo checada, mostra um estado neutro em vez de redirecionar cedo demais.
 */
export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return <div className="route-loading">Carregando…</div>
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}
