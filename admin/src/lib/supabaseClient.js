import { createClient } from '@supabase/supabase-js'

// Cliente único do Supabase para todo o painel.
// Usa a URL e a anon/publishable key (seguras para o frontend) via variáveis
// de ambiente — nunca a service_role key, que tem acesso irrestrito ao banco
// e só deve ser usada em ambiente de servidor.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Supabase não configurado: defina VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY no arquivo .env (veja .env.example).'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey)
