import { useCallback, useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../services/AuthContext.jsx'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

const AREAS = [
  { value: 'frontend', label: 'Front-end' },
  { value: 'backend', label: 'Back-end' },
  { value: 'fullstack', label: 'Full-stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'games', label: 'Desenvolvimento de Jogos' },
  { value: 'design', label: 'UX / UI Design' },
  { value: 'data', label: 'Ciência de Dados' },
  { value: 'devops', label: 'DevOps / Infra' },
  { value: 'seguranca', label: 'Segurança da Informação' },
]

const ESTADOS = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
  'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

const ESTADO_NOMES = {
  AC:'Acre',AL:'Alagoas',AP:'Amapá',AM:'Amazonas',BA:'Bahia',CE:'Ceará',
  DF:'Distrito Federal',ES:'Espírito Santo',GO:'Goiás',MA:'Maranhão',
  MT:'Mato Grosso',MS:'Mato Grosso do Sul',MG:'Minas Gerais',PA:'Pará',
  PB:'Paraíba',PR:'Paraná',PE:'Pernambuco',PI:'Piauí',RJ:'Rio de Janeiro',
  RN:'Rio Grande do Norte',RS:'Rio Grande do Sul',RO:'Rondônia',RR:'Roraima',
  SC:'Santa Catarina',SP:'São Paulo',SE:'Sergipe',TO:'Tocantins',
}

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

function GoogleSignInButton({ onLogin }) {
  const googleSignIn = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        const info = await res.json()
        onLogin({
          name: info.name,
          email: info.email,
          picture: info.picture,
          givenName: info.given_name,
          familyName: info.family_name,
          sub: info.sub,
        })
      } catch (err) {
        console.error('Erro ao obter dados do usuário:', err)
      }
    },
    onError: () => console.error('Falha no login Google'),
  })

  return (
    <button className="google-btn" onClick={googleSignIn}>
      <GoogleIcon />
      Continuar com Google
    </button>
  )
}

function LoginGate() {
  const { login } = useAuth()

  return (
    <div className="page">
      <section className="cadastro-auth">
        <div className="hero-badge animate-in">
          <span className="hero-badge-dot" />
          Autenticação segura · OAuth 2.0
        </div>

        <h1 className="cadastro-auth-title animate-in stagger-1">
          Entre no NexTask
        </h1>
        <p className="cadastro-auth-sub animate-in stagger-2">
          Use sua conta Google para acessar o app. Apenas nome, e-mail e foto são utilizados.
        </p>

        <div className="login-card animate-in stagger-3">
          <div className="login-card-body">
            <div className="login-card-header">
              <div className="login-card-logomark">N</div>
              <div>
                <div className="login-card-title">Entrar no NexTask</div>
                <div className="login-card-secure">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="11" width="18" height="11" rx="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Conexão criptografada
                </div>
              </div>
            </div>

            <p className="login-card-sub">
              Entre com o Google para acessar suas tarefas, histórico e preferências. Nenhum dado vai para servidores.
            </p>

            {CLIENT_ID
              ? <GoogleSignInButton onLogin={login} />
              : <div className="google-btn google-btn-disabled"><GoogleIcon />Continuar com Google</div>
            }

            <ul className="login-features">
              <li className="login-feature">
                <span className="login-feature-check"><CheckIcon /></span>
                Prioridades, categorias e prazos
              </li>
              <li className="login-feature">
                <span className="login-feature-check"><CheckIcon /></span>
                Dados 100% locais — sem nuvem
              </li>
              <li className="login-feature">
                <span className="login-feature-check"><CheckIcon /></span>
                Login único, sem cadastro longo
              </li>
            </ul>
          </div>

          <div className="login-card-footer">
            Apenas nome, e-mail e foto são lidos. Nenhum dado é compartilhado.
          </div>
        </div>
      </section>
    </div>
  )
}

function ProfilePreview({ form, user }) {
  const areaLabel = AREAS.find(a => a.value === form.area)?.label
  return (
    <div className="profile-preview-card">
      <div className="profile-preview-glow" />
      <div className="profile-preview-top">
        {user?.picture ? (
          <img src={user.picture} alt={form.nome} className="profile-preview-avatar" referrerPolicy="no-referrer" />
        ) : (
          <div className="profile-preview-avatar profile-preview-avatar-fallback">
            {(form.nome || user?.name || '?')[0].toUpperCase()}
          </div>
        )}
        <div className="profile-preview-badge">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Google
        </div>
      </div>
      <div className="profile-preview-name">{form.nome || 'Seu nome'}</div>
      <div className="profile-preview-email">{form.email || 'seu@email.com'}</div>

      {(areaLabel || form.cidade) && (
        <div className="profile-preview-details">
          {areaLabel && (
            <div className="profile-preview-detail">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              {areaLabel}
            </div>
          )}
          {form.cidade && (
            <div className="profile-preview-detail">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {form.cidade}{form.estado ? `, ${form.estado}` : ''}
            </div>
          )}
        </div>
      )}

      {form.bio && (
        <p className="profile-preview-bio">"{form.bio}"</p>
      )}
    </div>
  )
}

const EMPTY_FORM = {
  nome: '',
  email: '',
  telefone: '',
  dataNascimento: '',
  cidade: '',
  estado: '',
  area: '',
  bio: '',
}

function CadastroForm() {
  const { user } = useAuth()
  const [showJson, setShowJson] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [cadastroJSON, setCadastroJSON] = useState(null)

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        nome: prev.nome || user.name || '',
        email: prev.email || user.email || '',
      }))
    }
  }, [user])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const payload = {
      id: user?.sub || crypto.randomUUID(),
      ...form,
      origem: 'Google OAuth',
      foto: user?.picture || null,
      criadoEm: new Date().toISOString(),
    }
    setCadastroJSON(payload)
    setShowJson(true)
    console.log('📦 Cadastro NexTask:', payload)
  }

  const handleReset = () => {
    setForm({ ...EMPTY_FORM, nome: user?.name || '', email: user?.email || '' })
    setCadastroJSON(null)
  }

  return (
    <div className="page">
      <header className="section-head animate-in">
        <span className="section-eyebrow">Tela 03 · Cadastro de usuário</span>
        <h1 className="section-title">
          Complete seu <em>perfil</em>.
        </h1>
        <p className="section-subtitle">
          Nome e e-mail preenchidos automaticamente via Google. Ao finalizar, um JSON estruturado é gerado.
        </p>
      </header>

      {user && (
        <div className="profile-banner animate-in stagger-1">
          <div className="profile-banner-avatar-wrap">
            {user.picture ? (
              <img src={user.picture} alt={user.name} className="profile-banner-avatar" referrerPolicy="no-referrer" />
            ) : (
              <div className="profile-banner-avatar profile-banner-avatar-fallback">
                {(user.givenName || user.name || '?')[0].toUpperCase()}
              </div>
            )}
          </div>
          <div className="profile-banner-info">
            <div className="profile-banner-name">{user.name}</div>
            <div className="profile-banner-email">{user.email}</div>
          </div>
          <div className="profile-banner-badge">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            Verificado via Google
          </div>
        </div>
      )}

      <div className="cadastro-layout">
        <form className="card card-edge animate-in stagger-2" onSubmit={handleSubmit}>

          <div className="form-section">
            <div className="form-section-title">Identidade</div>

            <div className="form-group">
              <label className="form-label" htmlFor="nome">Nome completo</label>
              <input id="nome" name="nome" type="text" className="form-input"
                value={form.nome} onChange={handleChange} required />
              <p className="form-help">Pré-preenchido via Google</p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">E-mail</label>
              <input id="email" name="email" type="email" className="form-input"
                value={form.email} onChange={handleChange} required disabled />
              <p className="form-help">Vinculado à sua conta Google</p>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Contato &amp; Localização</div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="telefone">
                  Telefone <span className="form-label-opt">(opcional)</span>
                </label>
                <input id="telefone" name="telefone" type="tel" className="form-input"
                  placeholder="(24) 99999-9999" value={form.telefone} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="dataNascimento">
                  Nascimento <span className="form-label-opt">(opcional)</span>
                </label>
                <input id="dataNascimento" name="dataNascimento" type="date" className="form-input"
                  value={form.dataNascimento} onChange={handleChange} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor="cidade">Cidade</label>
                <input id="cidade" name="cidade" type="text" className="form-input"
                  placeholder="Barra Mansa" value={form.cidade} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="estado">Estado</label>
                <select id="estado" name="estado" className="form-select"
                  value={form.estado} onChange={handleChange}>
                  <option value="">Selecione…</option>
                  {ESTADOS.map(uf => (
                    <option key={uf} value={uf}>{ESTADO_NOMES[uf]}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="form-section-title">Perfil profissional</div>

            <div className="form-group">
              <label className="form-label" htmlFor="area">Área de interesse</label>
              <select id="area" name="area" className="form-select"
                value={form.area} onChange={handleChange}>
                <option value="">Selecione…</option>
                {AREAS.map(a => (
                  <option key={a.value} value={a.value}>{a.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="bio">
                Sobre você <span className="form-label-opt">(opcional)</span>
              </label>
              <textarea id="bio" name="bio" className="form-textarea"
                placeholder="Conte um pouco sobre suas experiências e interesses…"
                value={form.bio} onChange={handleChange} />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-accent">
              Finalizar cadastro
            </button>
            <button type="button" className="btn btn-outline" onClick={handleReset}>
              Limpar
            </button>
          </div>
        </form>

        <div className="cadastro-side animate-in stagger-3">
          <ProfilePreview form={form} user={user} />

          <div className="json-panel">
            <div className="json-header">
              <span className="json-title">// JSON gerado</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                {cadastroJSON && (
                  <button
                    type="button"
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: 12, padding: '4px 10px' }}
                    onClick={() => setShowJson(v => !v)}
                  >
                    {showJson ? 'Ocultar' : 'Ver JSON'}
                  </button>
                )}
                {cadastroJSON && <span className="json-badge">✓ Salvo</span>}
              </div>
            </div>

            {cadastroJSON && showJson ? (
              <div className="json-preview">
                <pre>{JSON.stringify(cadastroJSON, null, 2)}</pre>
              </div>
            ) : (
              <div className="json-empty">
                {cadastroJSON
                  ? 'Clique em "Ver JSON" para exibir.'
                  : <>Preencha o formulário e clique em <strong>"Finalizar cadastro"</strong> para gerar o JSON.</>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Cadastro() {
  const { user } = useAuth()
  if (!user) return <LoginGate />
  return <CadastroForm />
}
