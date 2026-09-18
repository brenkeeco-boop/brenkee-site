import './StatCard.css'

export default function StatCard({ label, value, Icon }) {
  return (
    <div className="stat-card card">
      <div className="stat-card__icon">
        <Icon size={20} />
      </div>
      <div>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__label">{label}</p>
      </div>
    </div>
  )
}
