/**
 * Dados mock — usados só até as páginas serem conectadas às tabelas reais
 * do Supabase (Tópicos 6+). Isolados aqui para trocar por chamadas reais
 * sem precisar mexer nos componentes de página.
 */

export const mockProjetos = [
  {
    id: 1,
    nome: 'Vitin Duu Corte',
    descricao: 'Site com sistema de agendamento online para barbearia.',
    categoria: 'Agendamento',
    link: '',
    imagem: '',
  },
  {
    id: 2,
    nome: 'Use Giselly Cristine',
    descricao: 'E-commerce de moda feminina, com catálogo, carrinho e checkout.',
    categoria: 'E-commerce',
    link: '',
    imagem: '',
  },
]

export const mockOrcamentos = [
  {
    id: 1,
    nome: 'Ana Souza',
    ramo: 'Salão de beleza',
    contato: '(61) 9xxxx-xxxx',
    mensagem: 'Quero um site com agendamento online.',
    status: 'Novo',
  },
  {
    id: 2,
    nome: 'Rafael Lima',
    ramo: 'Pizzaria',
    contato: '(61) 9xxxx-xxxx',
    mensagem: 'Preciso de um cardápio digital integrado ao WhatsApp.',
    status: 'Em contato',
  },
  {
    id: 3,
    nome: 'Carla Mendes',
    ramo: 'Loja de roupas',
    contato: '(61) 9xxxx-xxxx',
    mensagem: 'Gostaria de um orçamento para e-commerce.',
    status: 'Fechado',
  },
]

export const STATUS_ORCAMENTO = ['Novo', 'Em contato', 'Fechado', 'Perdido']

export const mockClientes = [
  {
    id: 1,
    nome: 'Vitin',
    negocio: 'Vitin Duu Corte',
    contato: '(61) 9xxxx-xxxx',
    projetos: ['Vitin Duu Corte'],
  },
  {
    id: 2,
    nome: 'Giselly Cristine',
    negocio: 'Use Giselly Cristine',
    contato: '(61) 9xxxx-xxxx',
    projetos: ['Use Giselly Cristine'],
  },
]

export const mockUsuarios = [
  { id: 1, nome: 'Kelve Bertunes', papel: 'Administrador', status: 'Ativo' },
  { id: 2, nome: 'Brenda', papel: 'Administradora', status: 'Convite pendente' },
]

export const mockConfiguracoes = {
  instagram: '@brenkee.co',
  whatsapp: '+55 61 99935-0668',
  nomeEmpresa: 'Brenkee',
  slogan: 'Soluções digitais para negócios que querem crescer.',
}

export const mockConteudoSite = {
  heroTitulo: 'Soluções digitais para negócios que querem crescer.',
  heroSubtitulo:
    'A Brenkee cria soluções digitais para o seu negócio vender mais, receber agendamentos, apresentar produtos e facilitar o contato com clientes — não apenas um site bonito.',
  sobreTexto:
    'A Brenkee é uma empresa de soluções digitais para negócios que querem crescer. Trabalhamos com sites, sistemas de agendamento, e-commerces, cardápios digitais e soluções personalizadas, sempre pensando no funcionamento e no objetivo de cada negócio — não apenas na aparência.',
  prazoEntrega: '5 a 10 dias úteis',
}
