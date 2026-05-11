import { useState } from 'react'
import type { Todo, Priority, Category } from '../types'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Todo>) => void
}

const PRIORITY_CONFIG: Record<Priority, { color: string; icon: string; label: string }> = {
  low: { color: '#22c55e', icon: 'fa-arrow-down', label: '低' },
  medium: { color: '#eab308', icon: 'fa-minus', label: '中' },
  high: { color: '#f97316', icon: 'fa-arrow-up', label: '高' },
  urgent: { color: '#ef4444', icon: 'fa-fire', label: '紧急' },
}

const CATEGORY_CONFIG: Record<Category, { icon: string; label: string; color: string }> = {
  work: { icon: 'fa-briefcase', label: '工作', color: '#3b82f6' },
  personal: { icon: 'fa-user', label: '个人', color: '#8b5cf6' },
  shopping: { icon: 'fa-cart-shopping', label: '购物', color: '#f59e0b' },
  health: { icon: 'fa-heart-pulse', label: '健康', color: '#ef4444' },
  study: { icon: 'fa-book', label: '学习', color: '#10b981' },
  other: { icon: 'fa-ellipsis', label: '其他', color: '#6b7280' },
}

export default function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const priority = PRIORITY_CONFIG[todo.priority]
  const category = CATEGORY_CONFIG[todo.category]

  const isOverdue = !todo.completed && todo.dueDate && new Date(todo.dueDate) < new Date()

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })
  }

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return
    onUpdate(todo.id, { title: editTitle.trim(), description: editDescription.trim() })
    setIsEditing(false)
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDelete(todo.id)
    } else {
      setShowDeleteConfirm(true)
      setTimeout(() => setShowDeleteConfirm(false), 3000)
    }
  }

  return (
    <div
      className={`todo-item animate__animated animate__fadeInUp ${todo.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`}
      style={{ '--pri-color': priority.color, '--cat-color': category.color } as React.CSSProperties}
    >
      <div className="todo-item-main">
        <button
          className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? '标记为未完成' : '标记为完成'}
        >
          {todo.completed ? (
            <i className="fas fa-check-circle"></i>
          ) : (
            <i className="far fa-circle"></i>
          )}
        </button>

        <div className="todo-content">
          {isEditing ? (
            <div className="todo-edit-form">
              <input
                type="text"
                value={editTitle}
                onChange={e => setEditTitle(e.target.value)}
                className="edit-title-input"
                placeholder="任务标题"
                autoFocus
              />
              <textarea
                value={editDescription}
                onChange={e => setEditDescription(e.target.value)}
                className="edit-desc-input"
                placeholder="任务描述"
                rows={2}
              />
              <div className="edit-actions">
                <button className="btn btn-sm btn-primary" onClick={handleSaveEdit}>
                  <i className="fas fa-check"></i> 保存
                </button>
                <button className="btn btn-sm btn-secondary" onClick={() => setIsEditing(false)}>
                  取消
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className={`todo-title ${todo.completed ? 'line-through' : ''}`}>
                {todo.title}
              </span>
              {todo.description && (
                <span className="todo-description">{todo.description}</span>
              )}
              <div className="todo-meta">
                <span className="todo-category" style={{ backgroundColor: category.color + '20', color: category.color }}>
                  <i className={`fas ${category.icon}`}></i>
                  {category.label}
                </span>
                <span className="todo-priority" style={{ color: priority.color }}>
                  <i className={`fas ${priority.icon}`}></i>
                  {priority.label}
                </span>
                {todo.dueDate && (
                  <span className={`todo-due ${isOverdue ? 'overdue-text' : ''}`}>
                    <i className="fas fa-calendar-day"></i>
                    {new Date(todo.dueDate).toLocaleDateString('zh-CN')}
                  </span>
                )}
                <span className="todo-created">
                  <i className="fas fa-clock"></i>
                  {new Date(todo.createdAt).toLocaleDateString('zh-CN')}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="todo-actions">
          {!isEditing && (
            <>
              <button
                className="btn-icon btn-edit"
                onClick={() => {
                  setEditTitle(todo.title)
                  setEditDescription(todo.description)
                  setIsEditing(true)
                }}
                title="编辑任务"
              >
                <i className="fas fa-pen-to-square"></i>
              </button>
              <button
                className={`btn-icon btn-delete ${showDeleteConfirm ? 'confirming' : ''}`}
                onClick={handleDelete}
                title={showDeleteConfirm ? '再次点击确认删除' : '删除任务'}
              >
                <i className={`fas ${showDeleteConfirm ? 'fa-circle-exclamation' : 'fa-trash-can'}`}></i>
              </button>
            </>
          )}
        </div>
      </div>

      {todo.completed && (
        <div className="completion-ribbon">
          <i className="fas fa-check"></i> 已完成
        </div>
      )}
    </div>
  )
}
