import { useState } from 'react'
import { mockConfiguracoes } from '../../data/mockData'

// TODO (Tópico 6+): ler/gravar numa tabela real (ex.: "configuracoes") no Supabase.
export default function Configuracoes() {
  const [form, setForm] = useState(mockConfiguracoes)
  const [salvo, setSalvo] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
    setSalvo(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSalvo(true)
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Configurações</h1>
          <p>Informações de contato e da empresa usadas no site público.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, maxWidth: 560 }}>
        {salvo && <div className="form-success">Alterações salvas (localmente, ainda não persistem no banco).</div>}

        <div className="form-field">
          <label htmlFor="cfg-nome">Nome da empresa</label>
          <input id="cfg-nome" value={form.nomeEmpresa} onChange={(e) => update('nomeEmpresa', e.target.value)} />
        </div>

        <div className="form-field">
          <label htmlFor="cfg-slogan">Slogan / posicionamento</label>
          <input id="cfg-slogan" value={form.slogan} onChange={(e) => update('slogan', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="cfg-whatsapp">WhatsApp</label>
            <input id="cfg-whatsapp" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} />
          </div>
          <div className="form-field">
            <label htmlFor="cfg-instagram">Instagram</label>
            <input id="cfg-instagram" value={form.instagram} onChange={(e) => update('instagram', e.target.value)} />
          </div>
        </div>

        <button type="submit" className="btn btn--primary">Salvar alterações</button>
      </form>
    </div>
  )
}
