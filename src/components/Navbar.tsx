import { NavLink } from 'react-router-dom'
import type { ThemeMode } from '../types'

interface NavbarProps {
  theme: ThemeMode
  toggleTheme: () => void
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <i className="fas fa-bolt navbar-logo-icon"></i>
        <span className="navbar-title">Fqin - ToDoList</span>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <i className="fas fa-tasks"></i>
          <span>任务</span>
        </NavLink>
        <NavLink to="/stats" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <i className="fas fa-chart-pie"></i>
          <span>统计</span>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <i className="fas fa-circle-info"></i>
          <span>关于</span>
        </NavLink>
      </div>

      <div className="navbar-actions">
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="切换主题"
          title={theme === 'light' ? '切换到暗色模式' : '切换到亮色模式'}
        >
          {theme === 'light' ? (
            <i className="fas fa-moon"></i>
          ) : (
            <i className="fas fa-sun"></i>
          )}
        </button>
      </div>
    </nav>
  )
}
