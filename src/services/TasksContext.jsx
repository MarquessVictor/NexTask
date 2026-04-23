import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'

const TasksContext = createContext(null)

const storageKeyFor = (userId) => `nextask:tasks:${userId || 'anon'}`

export const CATEGORIES = [
  { id: 'pessoal', label: 'Pessoal' },
  { id: 'trabalho', label: 'Trabalho' },
  { id: 'estudos', label: 'Estudos' },
  { id: 'saude', label: 'Saúde' },
  { id: 'financas', label: 'Finanças' },
  { id: 'casa', label: 'Casa' },
  { id: 'outro', label: 'Outro' },
]

export const PRIORITIES = [
  { id: 'high', label: 'Alta' },
  { id: 'medium', label: 'Média' },
  { id: 'low', label: 'Baixa' },
]

export function TasksProvider({ children }) {
  const { user } = useAuth()
  const userId = user?.sub || 'anon'
  const storageKey = storageKeyFor(userId)

  const [tasks, setTasks] = useState([])

  // Carregar quando muda o usuário
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      setTasks(raw ? JSON.parse(raw) : [])
    } catch {
      setTasks([])
    }
  }, [storageKey])

  // Salvar automaticamente
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(tasks))
    } catch {
      // ignore
    }
  }, [tasks, storageKey])

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: taskData.title.trim(),
      priority: taskData.priority || 'medium',
      category: taskData.category || 'pessoal',
      dueDate: taskData.dueDate || null,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    if (!newTask.title) return null
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }, [])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: !t.completed,
              completedAt: !t.completed ? new Date().toISOString() : null,
            }
          : t
      )
    )
  }, [])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const updateTask = useCallback((id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)))
  }, [])

  const clearCompleted = useCallback(() => {
    setTasks((prev) => prev.filter((t) => !t.completed))
  }, [])

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        deleteTask,
        updateTask,
        clearCompleted,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}

export function useTasks() {
  const ctx = useContext(TasksContext)
  if (!ctx) throw new Error('useTasks deve ser usado dentro de TasksProvider')
  return ctx
}
