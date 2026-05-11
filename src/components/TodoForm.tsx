import { useState } from 'react'
import type { Priority, Category } from '../types'

interface TodoFormProps {
  onAdd: (title: string, description: string, priority: Priority, category: Category, dueDate: string | null) => void
}

const PRIORITY_OPTIONS: { value: Priority; label: string; icon: string; color: string }[] = [
  { value: 'low', label: '低', icon: 'fa-arrow-down', color: '#22c55e' },
  { value: 'medium', label: '中', icon: 'fa-minus', color: '#eab308' },
  { value: 'high', label: '高', icon: 'fa-arrow-up', color: '#f97316' },
  { value: 'urgent', label: '紧急', icon: 'fa-fire', color: '#ef4444' },
]

const CATEGORY_OPTIONS: { value: Category; label: string; icon: string }[] = [
  { value: 'work', label: '工作', icon: 'fa-briefcase' },
  { value: 'personal', label: '个人', icon: 'fa-user' },
  { value: 'shopping', label: '购物', icon: 'fa-cart-shopping' },
  { value: 'health', label: '健康', icon: 'fa-heart-pulse' },
  { value: 'study', label: '学习', icon: 'fa-book' },
  { value: 'other', label: '其他', icon: 'fa-ellipsis' },
]

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState<Category>('personal')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd(title.trim(), description.trim(), priority, category, dueDate || null)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setCategory('personal')
    setDueDate('')
    setIsOpen(false)
  }

  return (
    <div className={`todo-form-container ${isOpen ? 'open' : ''}`}>
      {!isOpen ? (
        <button
          className="btn btn-primary btn-add-task animate__animated animate__fadeIn"
          onClick={() => setIsOpen(true)}
        >
          <i className="fas fa-plus-circle"></i>
          <span>添加新任务</span>
        </button>
      ) : (
        <form className="todo-form animate__animated animate__slideInDown" onSubmit={handleSubmit}>
          <div className="form-header">
            <h3>
              <i className="fas fa-pen-to-square"></i>
              创建新任务
            </h3>
            <button type="button" className="btn-close-form" onClick={() => setIsOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-heading"></i> 标题
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="需要做什么？"
              autoFocus
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-align-left"></i> 描述
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="添加一些详细说明..."
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <i className="fas fa-flag"></i> 优先级
              </label>
              <div className="priority-selector">
                {PRIORITY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`priority-btn ${priority === opt.value ? 'active' : ''}`}
                    style={{ '--pri-color': opt.color } as React.CSSProperties}
                    onClick={() => setPriority(opt.value)}
                    title={opt.label}
                  >
                    <i className={`fas ${opt.icon}`}></i>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-folder"></i> 分类
              </label>
              <div className="category-selector">
                {CATEGORY_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    className={`category-btn ${category === opt.value ? 'active' : ''}`}
                    onClick={() => setCategory(opt.value)}
                    title={opt.label}
                  >
                    <i className={`fas ${opt.icon}`}></i>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-calendar"></i> 截止日期
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setIsOpen(false)}>
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-check"></i>
              创建任务
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
