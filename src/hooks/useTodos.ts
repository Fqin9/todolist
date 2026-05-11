import { useState, useEffect, useCallback } from 'react'
import type { Todo, Priority, Category, TodoStats } from '../types'

const STORAGE_KEY = 'taskflow_todos'

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveTodos(todos: Todo[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos)
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'priority' | 'alpha'>('date')

  useEffect(() => {
    saveTodos(todos)
  }, [todos])

  const addTodo = useCallback((title: string, description: string, priority: Priority, category: Category, dueDate: string | null) => {
    const newTodo: Todo = {
      id: generateId(),
      title,
      description,
      completed: false,
      priority,
      category,
      dueDate,
      createdAt: new Date().toISOString(),
      order: todos.length,
    }
    setTodos(prev => [...prev, newTodo])
  }, [todos.length])

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }, [])

  const updateTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }, [])

  const reorderTodos = useCallback((fromIndex: number, toIndex: number) => {
    setTodos(prev => {
      const result = [...prev]
      const [removed] = result.splice(fromIndex, 1)
      result.splice(toIndex, 0, removed)
      return result.map((todo, i) => ({ ...todo, order: i }))
    })
  }, [])

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed))
  }, [])

  const filteredTodos = todos
    .filter(todo => filter === 'all' || todo.category === filter)
    .filter(todo => !search || todo.title.toLowerCase().includes(search.toLowerCase()) || todo.description.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      if (sortBy === 'priority') {
        const priorityWeight = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityWeight[b.priority] - priorityWeight[a.priority]
      }
      return a.title.localeCompare(b.title)
    })

  const getStats = useCallback((): TodoStats => {
    const now = new Date()
    const stats: TodoStats = {
      total: todos.length,
      completed: todos.filter(t => t.completed).length,
      pending: todos.filter(t => !t.completed).length,
      overdue: todos.filter(t => !t.completed && t.dueDate && new Date(t.dueDate) < now).length,
      byCategory: { work: 0, personal: 0, shopping: 0, health: 0, study: 0, other: 0 },
      byPriority: { low: 0, medium: 0, high: 0, urgent: 0 },
      completionRate: todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0,
    }
    todos.forEach(t => {
      stats.byCategory[t.category]++
      stats.byPriority[t.priority]++
    })
    return stats
  }, [todos])

  return {
    todos: filteredTodos,
    allTodos: todos,
    filter,
    setFilter,
    search,
    setSearch,
    sortBy,
    setSortBy,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    reorderTodos,
    clearCompleted,
    getStats,
  }
}
