import { useMemo } from 'react'
import type { Todo, TodoStats } from '../types'

interface StatsPageProps {
  getStats: () => TodoStats
  allTodos: Todo[]
}

const CATEGORY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  work: { label: '工作', icon: 'fa-briefcase', color: '#3b82f6' },
  personal: { label: '个人', icon: 'fa-user', color: '#8b5cf6' },
  shopping: { label: '购物', icon: 'fa-cart-shopping', color: '#f59e0b' },
  health: { label: '健康', icon: 'fa-heart-pulse', color: '#ef4444' },
  study: { label: '学习', icon: 'fa-book', color: '#10b981' },
  other: { label: '其他', icon: 'fa-ellipsis', color: '#6b7280' },
}

const PRIORITY_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  low: { label: '低', icon: 'fa-arrow-down', color: '#22c55e' },
  medium: { label: '中', icon: 'fa-minus', color: '#eab308' },
  high: { label: '高', icon: 'fa-arrow-up', color: '#f97316' },
  urgent: { label: '紧急', icon: 'fa-fire', color: '#ef4444' },
}

const WEEKDAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

export default function StatsPage({ getStats, allTodos }: StatsPageProps) {
  const stats = useMemo(() => getStats(), [getStats, allTodos])

  const weeklyData = useMemo(() => {
    const days: { day: string; count: number; date: string }[] = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date()
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      const count = allTodos.filter(t => {
        const created = t.createdAt.split('T')[0]
        return created === dateStr
      }).length
      days.push({
        day: WEEKDAY_NAMES[d.getDay()],
        count,
        date: dateStr,
      })
    }
    return days
  }, [allTodos])

  const maxWeekly = Math.max(...weeklyData.map(d => d.count), 1)

  const streakData = useMemo(() => {
    if (allTodos.length === 0) return { streak: 0, bestStreak: 0 }
    const completedSet = new Set(
      allTodos
        .filter(t => t.completed)
        .map(t => t.createdAt.split('T')[0])
    )
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().split('T')[0]
      if (completedSet.has(dateStr)) {
        streak++
      } else if (i === 0) {
        break
      } else {
        break
      }
    }
    return { streak, bestStreak: Math.max(streak, 7) }
  }, [allTodos])

  return (
    <div className="page stats-page animate__animated animate__fadeIn">
      <div className="stats-header">
        <h1 className="page-title">
          <i className="fas fa-chart-pie gradient-text"></i>
          <span className="gradient-text">数据统计</span>
        </h1>
        <p className="page-subtitle">追踪你的生产力与任务模式</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card animate__animated animate__fadeInLeft">
          <div className="stat-card-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
            <i className="fas fa-list-ol"></i>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.total}</span>
            <span className="stat-card-label">总任务数</span>
          </div>
        </div>

        <div className="stat-card animate__animated animate__fadeInLeft" style={{ animationDelay: '0.1s' }}>
          <div className="stat-card-icon" style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}>
            <i className="fas fa-circle-check"></i>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.completed}</span>
            <span className="stat-card-label">已完成</span>
          </div>
        </div>

        <div className="stat-card animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
          <div className="stat-card-icon" style={{ backgroundColor: '#f59e0b20', color: '#f59e0b' }}>
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.pending}</span>
            <span className="stat-card-label">待完成</span>
          </div>
        </div>

        <div className="stat-card animate__animated animate__fadeInLeft" style={{ animationDelay: '0.3s' }}>
          <div className="stat-card-icon" style={{ backgroundColor: '#ef444420', color: '#ef4444' }}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-card-info">
            <span className="stat-card-value">{stats.overdue}</span>
            <span className="stat-card-label">已逾期</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-panel animate__animated animate__fadeInUp">
          <h3 className="panel-title">
            <i className="fas fa-chart-bar"></i>
            按分类统计
          </h3>
          <div className="bar-chart">
            {(Object.entries(stats.byCategory) as [string, number][]).map(([cat, count]) => {
              const cfg = CATEGORY_LABELS[cat]
              const maxVal = Math.max(...Object.values(stats.byCategory), 1)
              const pct = Math.round((count / maxVal) * 100)
              return (
                <div key={cat} className="bar-row">
                  <div className="bar-label">
                    <i className={`fas ${cfg.icon}`} style={{ color: cfg.color }}></i>
                    <span>{cfg.label}</span>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: cfg.color,
                      }}
                    />
                  </div>
                  <span className="bar-count">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="stats-panel animate__animated animate__fadeInUp" style={{ animationDelay: '0.15s' }}>
          <h3 className="panel-title">
            <i className="fas fa-flag"></i>
            按优先级统计
          </h3>
          <div className="priority-donuts">
            {(Object.entries(stats.byPriority) as [string, number][]).map(([pri, count]) => {
              const cfg = PRIORITY_LABELS[pri]
              const maxVal = Math.max(...Object.values(stats.byPriority), 1)
              const pct = Math.round((count / maxVal) * 100)
              const angle = (count / Math.max(stats.total, 1)) * 360
              return (
                <div key={pri} className="priority-item">
                  <div className="priority-donut" style={{
                    background: `conic-gradient(${cfg.color} ${angle}deg, transparent ${angle}deg)`,
                  }}>
                    <span className="donut-value">{count}</span>
                  </div>
                  <div className="priority-info">
                    <i className={`fas ${cfg.icon}`} style={{ color: cfg.color }}></i>
                    <span>{cfg.label}</span>
                  </div>
                  <div className="priority-bar-mini">
                    <div className="priority-bar-fill" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="stats-panel animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h3 className="panel-title">
            <i className="fas fa-calendar-week"></i>
            本周活跃度
          </h3>
          <div className="weekly-chart">
            {weeklyData.map((day) => {
              const pct = Math.round((day.count / maxWeekly) * 100)
              const isToday = new Date().toISOString().split('T')[0] === day.date
              return (
                <div key={day.date} className="week-bar-container">
                  <div className="week-bar-wrapper">
                    <div
                      className={`week-bar ${isToday ? 'today' : ''}`}
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="week-label">{day.day}</span>
                  <span className="week-count">{day.count}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="stats-panel animate__animated animate__fadeInUp" style={{ animationDelay: '0.45s' }}>
          <h3 className="panel-title">
            <i className="fas fa-trophy"></i>
            成就徽章
          </h3>
          <div className="achievements">
            <div className={`achievement ${stats.completionRate >= 100 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">
                <i className="fas fa-crown"></i>
              </div>
              <div className="achievement-info">
                <span className="achievement-title">任务大师</span>
                <span className="achievement-desc">完成所有任务</span>
              </div>
              <span className="achievement-status">{stats.completionRate >= 100 ? '🏆' : '🔒'}</span>
            </div>
            <div className={`achievement ${stats.total >= 10 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">
                <i className="fas fa-layer-group"></i>
              </div>
              <div className="achievement-info">
                <span className="achievement-title">任务收藏家</span>
                <span className="achievement-desc">创建 10+ 个任务</span>
              </div>
              <span className="achievement-status">{stats.total >= 10 ? '🏆' : '🔒'}</span>
            </div>
            <div className={`achievement ${streakData.streak >= 7 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">
                <i className="fas fa-fire"></i>
              </div>
              <div className="achievement-info">
                <span className="achievement-title">七日连击</span>
                <span className="achievement-desc">连续 7 天完成任务</span>
              </div>
              <span className="achievement-status">{streakData.streak >= 7 ? '🏆' : '🔒'}</span>
            </div>
            <div className={`achievement ${stats.byCategory.work >= 5 ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon">
                <i className="fas fa-bolt"></i>
              </div>
              <div className="achievement-info">
                <span className="achievement-title">工作狂人</span>
                <span className="achievement-desc">处理 5+ 个工作任务</span>
              </div>
              <span className="achievement-status">{stats.byCategory.work >= 5 ? '🏆' : '🔒'}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-footer">
        <div className="completion-big animate__animated animate__fadeInUp">
          <div className="completion-circle">
            <svg viewBox="0 0 160 160">
              <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="circle-bg" />
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="url(#gradBig)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 70}`}
                strokeDashoffset={`${2 * Math.PI * 70 * (1 - stats.completionRate / 100)}`}
                transform="rotate(-90 80 80)"
                className="circle-fill"
              />
              <defs>
                <linearGradient id="gradBig" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff6b9d" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#4ecdc4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="completion-center">
              <span className="completion-rate">{stats.completionRate}%</span>
              <span className="completion-label">综合完成率</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
