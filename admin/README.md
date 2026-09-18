# Brenkee Admin — Painel administrativo

Painel interno da Brenkee: React + Vite + Supabase (Auth, banco e storage).

## Como rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. Como ainda não existe nenhuma sessão, a
aplicação redireciona automaticamente para `/login`.

Faça login com um usuário já existente no Supabase Auth do projeto.
Login válido → redireciona para `/dashboard`.

## Variáveis de ambiente

O arquivo `.env` já vem preenchido com a URL e a anon/publishable key do
projeto Supabase. Se precisar trocar de projeto, edite `.env` (veja
`.env.example` para o formato) — nunca use a `service_role key` aqui, só a
anon/publishable.

## Estado atual (Tópico 5 — estrutura visual)

- **Login** já está conectado de verdade ao Supabase Auth
  (`supabase.auth.signInWithPassword`).
- **Rotas protegidas**: tentar acessar qualquer página interna sem sessão
  válida redireciona para `/login`.
- **Logout** real (`supabase.auth.signOut`).
- **Dashboard, Projetos, Orçamentos, Clientes, Conteúdo do site,
  Configurações e Usuários**: interface completa, mas ainda usando dados
  mock (`src/data/mockData.js`). Adicionar/editar/excluir nessas páginas
  só altera o estado em memória — nada é salvo no banco ainda.

Cada arquivo de página tem um comentário `// TODO (Tópico 6+)` marcando
onde a leitura/gravação real do Supabase vai entrar.

## Estrutura de pastas

```
src/
  lib/            cliente único do Supabase
  context/        AuthContext (sessão, login, logout)
  components/     Sidebar, Topbar, Modal, StatCard, ícones etc. (reutilizáveis)
  layouts/        AdminLayout (sidebar + topbar + conteúdo)
  pages/          uma pasta por página do painel
  data/           dados mock, isolados para facilitar a troca por dados reais
  styles/         tokens de cor/tipografia + estilos globais
```

## Design

Reaproveita a identidade visual do site público da Brenkee (preto/dourado/azul,
Space Grotesk + Inter) — ver `src/styles/tokens.css`.
