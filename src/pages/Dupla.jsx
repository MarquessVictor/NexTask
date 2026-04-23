const dupla = [
  {
    nome: 'Victor Marques',
    papel: 'Full-stack Developer',
    tag: 'Dev · 01',
    descricao:
      'Cursando Engenharia de Software, com interesse em desenvolvimento de aplicações e ferramentas. Tem experiência construindo soluções tanto no front quanto no back-end, com foco em boas práticas e segurança.',
    skills: ['React', 'Laravel', 'PHP', 'Python', 'SQL', 'Segurança da Informação'],
    inicial: 'V',
  },
  {
    nome: 'Gabriel Paiva',
    papel: 'Game & UX Developer',
    tag: 'Dev · 02',
    descricao:
      'Cursando Engenharia de Software, com interesse em desenvolvimento de jogos digitais e design. Combina habilidades técnicas com pensamento criativo para criar experiências envolventes.',
    skills: ['Lua', 'UX Design', 'React'],
    inicial: 'G',
  },
]

export default function Dupla() {
  return (
    <div className="page">
      <header className="section-head animate-in">
        <span className="section-eyebrow">Quem desenvolveu</span>
        <h1 className="section-title">
          A <em>dupla</em> por<br />trás do NexTask.
        </h1>
        <p className="section-subtitle">
          Dois estudantes de Engenharia de Software com interesses complementares
          que se uniram para construir este projeto.
        </p>
      </header>

      <div className="dupla-grid">
        {dupla.map((dev, idx) => (
          <article
            key={dev.nome}
            className={`dev-card animate-in stagger-${idx + 1}`}
          >
            <span className="dev-tag">{dev.tag}</span>
            <div className="dev-avatar">{dev.inicial}</div>
            <h2 className="dev-name">{dev.nome}</h2>
            <div className="dev-role">{dev.papel}</div>
            <p className="dev-desc">{dev.descricao}</p>
            <div className="skill-tags">
              {dev.skills.map((skill) => (
                <span key={skill} className="skill-tag">{skill}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
