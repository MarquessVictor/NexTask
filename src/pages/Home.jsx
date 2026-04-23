import { Link } from 'react-router-dom'

const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero-badge animate-in">
          <span className="hero-badge-dot" />
          Gestão de tarefas pessoal
        </div>

        <h1 className="hero-title animate-in stagger-1">
          Organize o<br />que <em>importa</em>.
        </h1>

        <p className="hero-subtitle animate-in stagger-2">
          NexTask é seu hub de tarefas — com prioridades, categorias
          e prazos. Dados no seu navegador, privado por design.
        </p>

        <div className="hero-cta animate-in stagger-3">
          <Link to="/cadastro" className="btn btn-accent btn-lg">
            Começar agora <ArrowIcon />
          </Link>
          <span className="hero-cta-hint">Login com Google · Sem cadastro longo</span>
        </div>
      </section>

      <section className="features animate-in stagger-3">
        <div className="feature-card">
          <div className="feature-icon feature-icon-purple">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div className="feature-title">Prioridades</div>
          <p className="feature-desc">
            Alta, média ou baixa. Identifique de relance o que precisa de atenção agora e o que pode esperar.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon feature-icon-blue">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="14" y="14" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/>
            </svg>
          </div>
          <div className="feature-title">Categorias</div>
          <p className="feature-desc">
            Separe trabalho, estudos e vida pessoal com categorias que você define. Sem estrutura imposta.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon feature-icon-mint">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div className="feature-title">Prazos</div>
          <p className="feature-desc">
            Defina datas de entrega e receba alertas visuais quando uma tarefa está vencendo ou atrasada.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon feature-icon-coral">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div className="feature-title">Privacidade</div>
          <p className="feature-desc">
            Seus dados ficam no seu navegador. NexTask é privado por design.
          </p>
        </div>
      </section>

      <section className="preview-section animate-in stagger-3">
        <div className="preview-label">
          Prévia do aplicativo
        </div>

        <div className="preview-window">
          <div className="preview-bar">
            <div className="preview-dots">
              <span /><span /><span />
            </div>
            <span className="preview-url">NexTask · minhas tarefas</span>
          </div>

          <div className="preview-content">
            <div className="preview-composer">
              <span className="preview-plus">+</span>
              O que precisa ser feito hoje?
            </div>

            <div className="preview-stats">
              <div className="preview-stat">
                <span className="preview-stat-num">3</span>
                <span className="preview-stat-label">Pendentes</span>
              </div>
              <div className="preview-stat">
                <span className="preview-stat-num preview-stat-high">1</span>
                <span className="preview-stat-label">Alta prioridade</span>
              </div>
              <div className="preview-stat">
                <span className="preview-stat-num preview-stat-done">1</span>
                <span className="preview-stat-label">Concluída</span>
              </div>
            </div>

            <div className="task-list">
              <div className="task-item">
                <button className="task-check" tabIndex={-1} />
                <div className="task-body">
                  <div className="task-title">Revisar entrega do projeto técnico</div>
                  <div className="task-meta">
                    <span className="task-pill priority-high">Alta</span>
                    <span className="task-pill category-pill">Trabalho</span>
                    <span className="task-pill date-pill overdue">Vence hoje</span>
                  </div>
                </div>
              </div>

              <div className="task-item">
                <button className="task-check" tabIndex={-1} />
                <div className="task-body">
                  <div className="task-title">Estudar fundamentos de React e hooks avançados</div>
                  <div className="task-meta">
                    <span className="task-pill priority-medium">Média</span>
                    <span className="task-pill category-pill">Estudos</span>
                    <span className="task-pill date-pill">Amanhã</span>
                  </div>
                </div>
              </div>

              <div className="task-item">
                <button className="task-check" tabIndex={-1} />
                <div className="task-body">
                  <div className="task-title">Preparar apresentação do semestre</div>
                  <div className="task-meta">
                    <span className="task-pill priority-medium">Média</span>
                    <span className="task-pill category-pill">Faculdade</span>
                    <span className="task-pill date-pill">Sexta-feira</span>
                  </div>
                </div>
              </div>

              <div className="task-item completed">
                <button className="task-check" tabIndex={-1}>
                  <svg className="task-check-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </button>
                <div className="task-body">
                  <div className="task-title">Comprar material para o projeto</div>
                  <div className="task-meta">
                    <span className="task-pill priority-low">Baixa</span>
                    <span className="task-pill category-pill">Pessoal</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview-fade" />
          </div>
        </div>
      </section>

      <div className="strip animate-in stagger-3">
        <div className="strip-item">
          <span className="strip-num">01</span>
          <span className="strip-label">Login Google</span>
        </div>
        <div className="strip-item">
          <span className="strip-num">02</span>
          <span className="strip-label">Prioridades</span>
        </div>
        <div className="strip-item">
          <span className="strip-num">03</span>
          <span className="strip-label">Categorias</span>
        </div>
        <div className="strip-item">
          <span className="strip-num">04</span>
          <span className="strip-label">100% Privado</span>
        </div>
      </div>

      <section className="cta-section animate-in">
        <h2 className="cta-title">
          Sua primeira tarefa<br />está a um clique. <em>Vamos lá.</em>
        </h2>
        <p className="cta-sub">
          Crie sua conta em segundos. Sem formulário longo, sem cartão de crédito.
        </p>
        <div className="cta-actions">
          <Link to="/cadastro" className="btn btn-accent btn-lg">
            Criar conta grátis <ArrowIcon />
          </Link>
        </div>
      </section>

    </div>
  )
}
