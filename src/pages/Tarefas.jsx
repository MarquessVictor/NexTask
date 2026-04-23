import { useMemo, useState } from 'react'
import { useAuth } from '../services/AuthContext.jsx'
import { useTasks, CATEGORIES, PRIORITIES } from '../services/TasksContext.jsx'
import RequireAuth from '../components/RequireAuth.jsx'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 5) return 'Boa madrugada'
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
}

function formatTodayLabel() {
  const d = new Date()
  const weekday = d.toLocaleDateString('pt-BR', { weekday: 'long' })
  const date = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  return `${weekday} · ${date}`
}

function isOverdue(dateStr) {
  if (!dateStr) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  return d < today
}

function formatDueDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)

  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  if (sameDay(d, today)) return 'Hoje'
  if (sameDay(d, tomorrow)) return 'Amanhã'
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

const DAY_MS = 1000 * 60 * 60 * 24

function startOfDay(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x
}

function daysFromToday(dateStr) {
  if (!dateStr) return null
  const today = startOfDay(new Date())
  const target = startOfDay(new Date(dateStr))
  return Math.round((target - today) / DAY_MS)
}

function relativeDayLabel(diff, date) {
  if (diff === 0) return 'Hoje'
  if (diff === 1) return 'Amanhã'
  return date.toLocaleDateString('pt-BR', { weekday: 'long' })
}

function formatAgendaDate(date) {
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
}

function AgendaTaskRow({ task, onToggle, dayDiff }) {
  const priorityLabel = PRIORITIES.find((p) => p.id === task.priority)?.label || 'Média'
  const categoryLabel = CATEGORIES.find((c) => c.id === task.category)?.label || 'Pessoal'
  const overdue = dayDiff < 0

  return (
    <div className={`agenda-task ${overdue ? 'overdue' : ''}`}>
      <button
        className="agenda-task-check"
        onClick={onToggle}
        aria-label="Concluir tarefa"
        title="Concluir"
      />
      <div className="agenda-task-body">
        <div className="agenda-task-title">{task.title}</div>
        <div className="agenda-task-meta">
          <span className={`task-pill priority-${task.priority}`}>● {priorityLabel}</span>
          <span className="task-pill category-pill">{categoryLabel}</span>
        </div>
      </div>
    </div>
  )
}

function AgendaTimeline({ tasks, onToggle }) {
  const { todayBucket, upcomingBuckets, overdueTasks, hasAnything } = useMemo(() => {
    const today = startOfDay(new Date())
    const buckets = Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today)
      d.setDate(today.getDate() + i)
      return { date: d, diff: i, tasks: [] }
    })
    const overdue = []

    tasks.forEach((t) => {
      if (t.completed || !t.dueDate) return
      const diff = daysFromToday(t.dueDate)
      if (diff < 0) overdue.push(t)
      else if (diff < 7) buckets[diff].tasks.push(t)
    })

    overdue.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

    const sortByPriority = (a, b) => {
      const rank = { high: 0, medium: 1, low: 2 }
      return (rank[a.priority] ?? 1) - (rank[b.priority] ?? 1)
    }
    buckets.forEach((b) => b.tasks.sort(sortByPriority))

    const todayB = buckets[0]
    const upcoming = buckets.slice(1).filter((b) => b.tasks.length > 0)

    return {
      todayBucket: todayB,
      upcomingBuckets: upcoming,
      overdueTasks: overdue,
      hasAnything: overdue.length > 0 || todayB.tasks.length > 0 || upcoming.length > 0,
    }
  }, [tasks])

  return (
    <section className="agenda-section animate-in stagger-2">
      <div className="agenda-head">
        <div>
          <h2 className="agenda-title">
            Sua <em>agenda</em>
          </h2>
          <div className="agenda-subtitle">Hoje + próximos 7 dias</div>
        </div>
        {hasAnything && (
          <div className="agenda-meta">
            <span className="agenda-meta-num">
              {overdueTasks.length + todayBucket.tasks.length +
                upcomingBuckets.reduce((acc, b) => acc + b.tasks.length, 0)}
            </span>
            <span className="agenda-meta-label">com prazo</span>
          </div>
        )}
      </div>

      {overdueTasks.length > 0 && (
        <div className="agenda-overdue-banner">
          <div className="agenda-overdue-head">
            <span className="agenda-overdue-icon">!</span>
            <div>
              <div className="agenda-overdue-title">
                {overdueTasks.length === 1
                  ? '1 tarefa atrasada'
                  : `${overdueTasks.length} tarefas atrasadas`}
              </div>
              <div className="agenda-overdue-sub">Passaram do prazo — resolva primeiro.</div>
            </div>
          </div>
          <div className="agenda-overdue-list">
            {overdueTasks.map((t) => (
              <AgendaTaskRow
                key={t.id}
                task={t}
                dayDiff={daysFromToday(t.dueDate)}
                onToggle={() => onToggle(t.id)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="agenda-grid">
        <article className="agenda-today-card">
          <header className="agenda-today-head">
            <div>
              <div className="agenda-today-eyebrow">Hoje</div>
              <div className="agenda-today-date">
                {todayBucket.date.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </div>
            </div>
            <div className="agenda-today-count">
              <span>{todayBucket.tasks.length}</span>
              <small>{todayBucket.tasks.length === 1 ? 'tarefa' : 'tarefas'}</small>
            </div>
          </header>

          {todayBucket.tasks.length === 0 ? (
            <div className="agenda-today-empty">
              <div className="agenda-today-empty-mark">✺</div>
              <div className="agenda-today-empty-title">Nada agendado pra hoje</div>
              <div className="agenda-today-empty-sub">
                Aproveita pra adiantar algo dos próximos dias.
              </div>
            </div>
          ) : (
            <div className="agenda-today-list">
              {todayBucket.tasks.map((t) => (
                <AgendaTaskRow
                  key={t.id}
                  task={t}
                  dayDiff={0}
                  onToggle={() => onToggle(t.id)}
                />
              ))}
            </div>
          )}
        </article>

        <aside className="agenda-upcoming">
          <div className="agenda-upcoming-label">Próximos 6 dias</div>
          {upcomingBuckets.length === 0 ? (
            <div className="agenda-upcoming-empty">
              Nenhuma tarefa com prazo nos próximos dias. ✨
            </div>
          ) : (
            <div className="agenda-upcoming-list">
              {upcomingBuckets.map((b) => (
                <div key={b.date.toISOString()} className="agenda-day">
                  <div className="agenda-day-head">
                    <div className="agenda-day-relative">
                      {relativeDayLabel(b.diff, b.date)}
                    </div>
                    <div className="agenda-day-date">{formatAgendaDate(b.date)}</div>
                    <div className="agenda-day-count">{b.tasks.length}</div>
                  </div>
                  <div className="agenda-day-tasks">
                    {b.tasks.map((t) => (
                      <AgendaTaskRow
                        key={t.id}
                        task={t}
                        dayDiff={b.diff}
                        onToggle={() => onToggle(t.id)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

function TasksInner() {
  const { user } = useAuth()
  const { tasks, addTask, toggleTask, deleteTask, clearCompleted } = useTasks()

  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('pessoal')
  const [dueDate, setDueDate] = useState('')

  const [filter, setFilter] = useState('all') // all | pending | done | overdue
  const [categoryFilter, setCategoryFilter] = useState('all')

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ title, priority, category, dueDate: dueDate || null })
    setTitle('')
    setDueDate('')
  }

  const counts = useMemo(() => {
    const total = tasks.length
    const done = tasks.filter((t) => t.completed).length
    const pending = total - done
    const overdueCount = tasks.filter((t) => !t.completed && isOverdue(t.dueDate)).length
    return { total, done, pending, overdue: overdueCount }
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (filter === 'pending' && t.completed) return false
      if (filter === 'done' && !t.completed) return false
      if (filter === 'overdue' && (t.completed || !isOverdue(t.dueDate))) return false
      if (categoryFilter !== 'all' && t.category !== categoryFilter) return false
      return true
    })
  }, [tasks, filter, categoryFilter])

  const priorityRank = { high: 0, medium: 1, low: 2 }

  const grouped = useMemo(() => {
    const pending = filteredTasks
      .filter((t) => !t.completed)
      .sort((a, b) => {
        // Ordenar por prioridade, depois por data
        const p = priorityRank[a.priority] - priorityRank[b.priority]
        if (p !== 0) return p
        if (a.dueDate && b.dueDate) return new Date(a.dueDate) - new Date(b.dueDate)
        if (a.dueDate) return -1
        if (b.dueDate) return 1
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

    const done = filteredTasks
      .filter((t) => t.completed)
      .sort((a, b) => new Date(b.completedAt || 0) - new Date(a.completedAt || 0))

    return { pending, done }
  }, [filteredTasks])

  const firstName = user?.givenName || user?.name?.split(' ')[0] || 'você'

  return (
    <div className="page">
      <header className="dash-head animate-in">
        <div>
          <h1 className="dash-greeting">
            {getGreeting()}, <em>{firstName}</em>.
          </h1>
          <div className="dash-date">{formatTodayLabel()}</div>
        </div>
      </header>

      <div className="dash-stats animate-in stagger-1">
        <div className="stat stat-bg-ink">
          <div className="stat-label">Pendentes</div>
          <div className="stat-number">{counts.pending}</div>
          <div className="stat-hint">tarefas a fazer</div>
        </div>
        <div className="stat stat-bg-accent">
          <div className="stat-label">Atrasadas</div>
          <div className="stat-number">{counts.overdue}</div>
          <div className="stat-hint">passaram do prazo</div>
        </div>
        <div className="stat">
          <div className="stat-label">Concluídas</div>
          <div className="stat-number">{counts.done}</div>
          <div className="stat-hint">já finalizadas</div>
        </div>
        <div className="stat">
          <div className="stat-label">Total</div>
          <div className="stat-number">{counts.total}</div>
          <div className="stat-hint">no histórico</div>
        </div>
      </div>

      <AgendaTimeline tasks={tasks} onToggle={toggleTask} />

      <form className="composer animate-in stagger-2" onSubmit={handleAdd}>
        <div className="composer-title">
          O que precisa ser <em>feito</em>?
        </div>
        <input
          type="text"
          className="composer-input"
          placeholder="Ex: Terminar o relatório de história…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={140}
        />
        <div className="composer-row">
          <select
            className="composer-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            title="Prioridade"
          >
            {PRIORITIES.map((p) => (
              <option key={p.id} value={p.id}>
                Prioridade: {p.label}
              </option>
            ))}
          </select>

          <select
            className="composer-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            title="Categoria"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="composer-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            title="Data de vencimento"
          />

          <button type="submit" className="btn btn-accent composer-submit">
            Adicionar tarefa +
          </button>
        </div>
      </form>

      {/* Filtros */}
      <div className="filters animate-in stagger-3">
        <span className="filter-label">Status</span>
        <button
          className={`filter-chip ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Todas <span className="count">{counts.total}</span>
        </button>
        <button
          className={`filter-chip ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pendentes <span className="count">{counts.pending}</span>
        </button>
        <button
          className={`filter-chip ${filter === 'overdue' ? 'active' : ''}`}
          onClick={() => setFilter('overdue')}
        >
          Atrasadas <span className="count">{counts.overdue}</span>
        </button>
        <button
          className={`filter-chip ${filter === 'done' ? 'active' : ''}`}
          onClick={() => setFilter('done')}
        >
          Concluídas <span className="count">{counts.done}</span>
        </button>

        {counts.done > 0 && (
          <button
            className="btn btn-ghost btn-sm"
            onClick={clearCompleted}
            style={{ marginLeft: 'auto' }}
          >
            🗑 Limpar concluídas
          </button>
        )}
      </div>

      <div className="filters" style={{ marginTop: -8 }}>
        <span className="filter-label">Categoria</span>
        <button
          className={`filter-chip ${categoryFilter === 'all' ? 'active' : ''}`}
          onClick={() => setCategoryFilter('all')}
        >
          Todas
        </button>
        {CATEGORIES.map((c) => {
          const n = tasks.filter((t) => t.category === c.id).length
          if (n === 0) return null
          return (
            <button
              key={c.id}
              className={`filter-chip ${categoryFilter === c.id ? 'active' : ''}`}
              onClick={() => setCategoryFilter(c.id)}
            >
              {c.label} <span className="count">{n}</span>
            </button>
          )
        })}
      </div>

      {/* Lista */}
      {filteredTasks.length === 0 ? (
        <div className="empty-state animate-in">
          <div className="empty-icon">✺</div>
          <div className="empty-title">
            Nenhuma tarefa <em>por aqui</em>.
          </div>
          <p className="empty-desc">
            {tasks.length === 0
              ? 'Comece adicionando sua primeira tarefa usando o campo acima.'
              : 'Tente ajustar os filtros ou criar uma nova tarefa.'}
          </p>
        </div>
      ) : (
        <>
          {grouped.pending.length > 0 && (
            <section className="task-group animate-in">
              <div className="task-group-title">
                <h3>Pendentes</h3>
                <span className="task-group-count">
                  · {grouped.pending.length} {grouped.pending.length === 1 ? 'tarefa' : 'tarefas'}
                </span>
              </div>
              <div className="task-list">
                {grouped.pending.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </div>
            </section>
          )}

          {grouped.done.length > 0 && (
            <section className="task-group animate-in">
              <div className="task-group-title">
                <h3>Concluídas</h3>
                <span className="task-group-count">
                  · {grouped.done.length} {grouped.done.length === 1 ? 'finalizada' : 'finalizadas'}
                </span>
              </div>
              <div className="task-list">
                {grouped.done.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={() => toggleTask(task.id)}
                    onDelete={() => deleteTask(task.id)}
                  />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}

function TaskItem({ task, onToggle, onDelete }) {
  const priorityLabel = PRIORITIES.find((p) => p.id === task.priority)?.label || 'Média'
  const categoryLabel = CATEGORIES.find((c) => c.id === task.category)?.label || 'Pessoal'
  const overdue = !task.completed && isOverdue(task.dueDate)
  const dueLabel = formatDueDate(task.dueDate)

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} animate-slide`}>
      <button
        className="task-check"
        onClick={onToggle}
        aria-label={task.completed ? 'Desmarcar tarefa' : 'Concluir tarefa'}
      >
        <svg className="task-check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 6.5L5 9L9.5 3.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="task-body">
        <div className="task-title">{task.title}</div>
        <div className="task-meta">
          <span className={`task-pill priority-${task.priority}`}>
            ● {priorityLabel}
          </span>
          <span className="task-pill category-pill">{categoryLabel}</span>
          {dueLabel && (
            <span className={`task-pill date-pill ${overdue ? 'overdue' : ''}`}>
              📅 {dueLabel}
            </span>
          )}
        </div>
      </div>

      <div className="task-actions">
        <button
          className="icon-btn danger"
          onClick={onDelete}
          aria-label="Excluir tarefa"
          title="Excluir"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M3 4h8M5.5 4V2.5a1 1 0 011-1h1a1 1 0 011 1V4M4 4l.5 7a1 1 0 001 1h3a1 1 0 001-1L10 4"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Tarefas() {
  return (
    <RequireAuth message="Para acessar suas tarefas, faça login com Google na tela inicial.">
      <TasksInner />
    </RequireAuth>
  )
}
