import { useState } from 'react'
import { mockConteudoSite } from '../../data/mockData'

// TODO (Tópico 6+): ler/gravar esses campos numa tabela real (ex.: "conteudo_site")
// no Supabase, em vez do estado local abaixo.
export default function ConteudoSite() {
  const [form, setForm] = useState(mockConteudoSite)
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
          <h1>Conteúdo do site</h1>
          <p>Textos institucionais exibidos no site público — ainda não salvam de verdade.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card" style={{ padding: 24, maxWidth: 720 }}>
        {salvo && <div className="form-success">Alterações salvas (localmente, ainda não persistem no banco).</div>}

        <div className="form-field">
          <label htmlFor="c-hero-titulo">Título do Hero</label>
          <input
            id="c-hero-titulo"
            value={form.heroTitulo}
            onChange={(e) => update('heroTitulo', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="c-hero-subtitulo">Subtítulo do Hero</label>
          <textarea
            id="c-hero-subtitulo"
            value={form.heroSubtitulo}
            onChange={(e) => update('heroSubtitulo', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="c-sobre">Texto "Sobre a Brenkee"</label>
          <textarea
            id="c-sobre"
            value={form.sobreTexto}
            onChange={(e) => update('sobreTexto', e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="c-prazo">Prazo de entrega</label>
          <input
            id="c-prazo"
            value={form.prazoEntrega}
            onChange={(e) => update('prazoEntrega', e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn--primary">Salvar alterações</button>
      </form>
    </div>
  )
}
