/**
 * Conjunto pequeno de ícones em SVG inline (sem dependência externa).
 * Todos aceitam `size` e demais props (className, etc.) e herdam a cor
 * do texto via `currentColor`.
 */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 18, children, ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...props}>
      {children}
    </svg>
  )
}

export function IconDashboard(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Svg>
  )
}

export function IconProjetos(props) {
  return (
    <Svg {...props}>
      <path d="M4 7a2 2 0 0 1 2-2h3l2 2h7a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z" />
    </Svg>
  )
}

export function IconOrcamentos(props) {
  return (
    <Svg {...props}>
      <path d="M7 3h10l3 4v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7l3-4Z" />
      <path d="M4 7h16" />
      <path d="M9 12h6M9 16h4" />
    </Svg>
  )
}

export function IconClientes(props) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <circle cx="17.5" cy="8.5" r="2.4" />
      <path d="M15.6 14.8c2.6.3 4.4 2.3 4.4 5.2" />
    </Svg>
  )
}

export function IconConteudo(props) {
  return (
    <Svg {...props}>
      <path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M9 12h6M9 16h6M9 8h3" />
    </Svg>
  )
}

export function IconConfiguracoes(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13a7.6 7.6 0 0 0 0-2l2-1.5-2-3.4-2.3.8a7.7 7.7 0 0 0-1.8-1L15 3.6h-4l-.3 2.3a7.7 7.7 0 0 0-1.8 1l-2.3-.8-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.3-.8a7.7 7.7 0 0 0 1.8 1l.3 2.3h4l.3-2.3a7.7 7.7 0 0 0 1.8-1l2.3.8 2-3.4-2-1.6Z" />
    </Svg>
  )
}

export function IconUsuarios(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c0-4.1 3.4-6.5 7.5-6.5s7.5 2.4 7.5 6.5" />
    </Svg>
  )
}

export function IconLogout(props) {
  return (
    <Svg {...props}>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 8l-4 4 4 4" />
      <path d="M6 12h12" />
    </Svg>
  )
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </Svg>
  )
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  )
}

export function IconPlus(props) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  )
}

export function IconEdit(props) {
  return (
    <Svg {...props}>
      <path d="M4 20l4-1 11-11-3-3L5 16l-1 4Z" />
    </Svg>
  )
}

export function IconTrash(props) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M6 7l1 13h10l1-13" />
    </Svg>
  )
}

export function IconEye(props) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.6" />
    </Svg>
  )
}

export function IconLink(props) {
  return (
    <Svg {...props}>
      <path d="M9.5 14.5l5-5" />
      <path d="M11 6.5l1-1a3.5 3.5 0 0 1 5 5l-1 1" />
      <path d="M13 17.5l-1 1a3.5 3.5 0 0 1-5-5l1-1" />
    </Svg>
  )
}
