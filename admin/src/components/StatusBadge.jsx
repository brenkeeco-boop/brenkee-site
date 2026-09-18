const STATUS_CLASS = {
  'Novo': 'badge--novo',
  'Em contato': 'badge--em-contato',
  'Fechado': 'badge--fechado',
  'Perdido': 'badge--perdido',
}

export default function StatusBadge({ status }) {
  const cls = STATUS_CLASS[status] ?? 'badge--novo'
  return <span className={`badge ${cls}`}>{status}</span>
}
