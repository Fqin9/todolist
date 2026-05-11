export type Priority = 'low' | 'medium' | 'high' | 'urgent'

export type Category = 'work' | 'personal' | 'shopping' | 'health' | 'study' | 'other'

export interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
  priority: Priority
  category: Category
  dueDate: string | null
  createdAt: string
  order: number
}

export type ThemeMode = 'light' | 'dark'

export interface TodoStats {
  total: number
  completed: number
  pending: number
  overdue: number
  byCategory: Record<Category, number>
  byPriority: Record<Priority, number>
  completionRate: number
}

export interface AppState {
  todos: Todo[]
  theme: ThemeMode
}
