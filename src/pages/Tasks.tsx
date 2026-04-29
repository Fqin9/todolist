import { useState, useMemo, useEffect } from 'react'
import type { Todo, Category } from '../types'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

interface TasksPageProps {
  todos: Todo[]
  allTodos: Todo[]
  filter: Category | 'all'
  setFilter: (f: Category | 'all') => void
  search: string
  setSearch: (s: string) => void
  sortBy: 'date' | 'priority' | 'alpha'
  setSortBy: (s: 'date' | 'priority' | 'alpha') => void
  addTodo: (title: string, description: string, priority: Todo['priority'], category: Todo['category'], dueDate: string | null) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void
  updateTodo: (id: string, updates: Partial<Todo>) => void
  clearCompleted: () => void
}

const CATEGORY_FILTERS: { value: Category | 'all'; label: string; icon: string }[] = [
  { value: 'all', label: '全部', icon: 'fa-layer-group' },
  { value: 'work', label: '工作', icon: 'fa-briefcase' },
  { value: 'personal', label: '个人', icon: 'fa-user' },
  { value: 'shopping', label: '购物', icon: 'fa-cart-shopping' },
  { value: 'health', label: '健康', icon: 'fa-heart-pulse' },
  { value: 'study', label: '学习', icon: 'fa-book' },
  { value: 'other', label: '其他', icon: 'fa-ellipsis' },
]

export default function TasksPage({
  todos, allTodos, filter, setFilter, search, setSearch,
  sortBy, setSortBy, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted,
}: TasksPageProps) {
  const [viewMode, setViewMode] = useState<'list' | 'compact'>('list')
  const [typedText, setTypedText] = useState('')
  const [counts, setCounts] = useState({ tasks: 0, completed: 0, productivity: 0 })
  const fullText = 'Fqin - ToDoList'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i))
        i++
      } else {
        clearInterval(interval)
      }
    }, 120)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const completed = allTodos.filter(t => t.completed).length
    const total = allTodos.length
    const animateCount = (target: number, key: 'tasks' | 'completed' | 'productivity') => {
      let current = 0
      const step = Math.ceil(target / 50) || 1
      const timer = setInterval(() => {
        current += step
        if (current >= target) {
          setCounts(prev => ({ ...prev, [key]: target }))
          clearInterval(timer)
        } else {
          setCounts(prev => ({ ...prev, [key]: current }))
        }
      }, 30)
    }
    animateCount(total, 'tasks')
    animateCount(completed, 'completed')
    animateCount(total > 0 ? Math.round((completed / total) * 100) : 0, 'productivity')
  }, [allTodos])

  const stats = useMemo(() => {
    const completed = allTodos.filter(t => t.completed).length
    const total = allTodos.length
    return { completed, total, rate: total > 0 ? Math.round((completed / total) * 100) : 0 }
  }, [allTodos])

  const pendingCount = allTodos.filter(t => !t.completed).length

  return (
    <div className="page tasks-page animate__animated animate__fadeIn">
      <section className="hero-section hero-compact animate__animated animate__fadeIn">
        <div className="hero-content">
          <div className="hero-badge animate__animated animate__bounceIn">
            <i className="fas fa-rocket"></i>
            <span>极致效率，从任务管理开始</span>
          </div>

          <h1 className="hero-title">
            <span className="gradient-text">{typedText}</span>
            <span className="cursor-blink">|</span>
          </h1>

          <p className="hero-subtitle">
            一个功能丰富、动画炫酷的待办事项应用，帮助你优雅地管理每一个任务。
          </p>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">{counts.tasks}</span>
              <span className="stat-label">总任务</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{counts.completed}</span>
              <span className="stat-label">已完成</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">{counts.productivity}%</span>
              <span className="stat-label">完成率</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
          <div className="hero-icon-large">
            <i className="fas fa-list-check"></i>
          </div>
        </div>
      </section>

      <div className="tasks-header">
        <div className="tasks-header-top">
          <div>
            <h1 className="page-title">
              <i className="fas fa-tasks gradient-text"></i>
              <span className="gradient-text">我的任务</span>
            </h1>
            <p className="page-subtitle">
              {pendingCount > 0
                ? `还有 ${pendingCount} 个任务等待完成`
                : '全部搞定！🎉'}
            </p>
          </div>

          <div className="tasks-progress-ring">
            <svg className="progress-ring" viewBox="0 0 100 100">
              <circle
                className="progress-ring-bg"
                cx="50" cy="50" r="42"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
              />
              <circle
                className="progress-ring-fill"
                cx="50" cy="50" r="42"
                fill="none"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - stats.rate / 100)}`}
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ff6b9d" />
                  <stop offset="100%" stopColor="#4ecdc4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="progress-ring-text">
              <span className="progress-ring-value">{stats.rate}%</span>
              <span className="progress-ring-label">已完成</span>
            </div>
          </div>
        </div>

        <div className="tasks-toolbar">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="搜索任务..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button className="search-clear" onClick={() => setSearch('')}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          <div className="toolbar-actions">
            <div className="sort-select">
              <i className="fas fa-arrow-down-wide-short"></i>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}>
                <option value="date">按时间排序</option>
                <option value="priority">按优先级排序</option>
                <option value="alpha">按字母排序</option>
              </select>
            </div>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="列表视图"
              >
                <i className="fas fa-list"></i>
              </button>
              <button
                className={`view-btn ${viewMode === 'compact' ? 'active' : ''}`}
                onClick={() => setViewMode('compact')}
                title="紧凑视图"
              >
                <i className="fas fa-grip"></i>
              </button>
            </div>

            <button className="btn btn-sm btn-danger" onClick={clearCompleted} disabled={stats.completed === 0}>
              <i className="fas fa-broom"></i>
              清除已完成
            </button>
          </div>
        </div>

        <div className="category-filters">
          {CATEGORY_FILTERS.map(cat => (
            <button
              key={cat.value}
              className={`category-filter-btn ${filter === cat.value ? 'active' : ''}`}
              onClick={() => setFilter(cat.value)}
            >
              <i className={`fas ${cat.icon}`}></i>
              <span>{cat.label}</span>
              {cat.value === 'all' && (
                <span className="filter-count">{allTodos.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="tasks-content">
        <TodoForm onAdd={addTodo} />

        {todos.length === 0 ? (
          <div className="empty-state animate__animated animate__fadeIn">
            <div className="empty-icon">
              <i className="fas fa-clipboard-list"></i>
            </div>
            <h3>{search ? '没有找到匹配的任务' : '还没有任务'}</h3>
            <p>
              {search
                ? '试试换个搜索词或者清除筛选条件。'
                : '点击上方的"添加新任务"按钮来创建你的第一个任务吧！'}
            </p>
          </div>
        ) : (
          <div className={`tasks-wrapper ${viewMode === 'compact' ? 'compact-view' : ''}`}>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        )}
      </div>
    </div>
  )
}
