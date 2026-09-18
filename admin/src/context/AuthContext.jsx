import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(undefined)

/**
 * Fornece o estado de sessão do Supabase Auth para todo o painel.
 * `loading` fica true só na checagem inicial (evita redirecionar pro
 * login antes de saber se já existe uma sessão salva).
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (error) console.error('Não foi possível recuperar a sessão do Supabase.', error)
        setSession(data?.session ?? null)
      })
      .finally(() => setLoading(false))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return { error }
    setSession(data.session)
    return { error: null }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) setSession(null)
    return { error }
  }

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth precisa ser usado dentro de um <AuthProvider>')
  }
  return ctx
}
