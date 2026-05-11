export default function AboutPage() {
  const techStack = [
    { name: 'React 19', icon: 'fa-brands fa-react', color: '#61dafb' },
    { name: 'TypeScript', icon: 'fa-brands fa-js', color: '#3178c6' },
    { name: 'Three.js', icon: 'fa-cube', color: '#049ef4' },
    { name: 'Vite', icon: 'fa-bolt', color: '#bd34fe' },
    { name: 'Font Awesome', icon: 'fa-font-awesome', color: '#538dd7' },
    { name: 'Animate.css', icon: 'fa-wand-magic-sparkles', color: '#f59e0b' },
    { name: 'CSS3', icon: 'fa-brands fa-css3-alt', color: '#1572b6' },
    { name: 'LocalStorage', icon: 'fa-database', color: '#22c55e' },
  ]

  const tips = [
    { icon: 'fa-lightbulb', text: '使用搜索栏可以快速在所有分类中查找任务。' },
    { icon: 'fa-filter', text: '按分类筛选任务，只关注你当前最需要处理的内容。' },
    { icon: 'fa-sort', text: '支持按时间、优先级或字母顺序排列任务列表。' },
    { icon: 'fa-moon', text: '在亮色和暗色模式之间自由切换，保护眼睛。' },
    { icon: 'fa-chart-pie', text: '打开统计页面查看你的生产力趋势和成就徽章。' },
    { icon: 'fa-keyboard', text: '你的所有数据都保存在本地浏览器中，无需注册账号！' },
  ]

  return (
    <div className="page about-page animate__animated animate__fadeIn">
      <div className="about-hero">
        <div className="about-icon-large magictime puffIn">
          <i className="fas fa-bolt"></i>
        </div>
        <h1 className="about-title">
          关于 <span className="gradient-text">Fqin - ToDoList</span>
        </h1>
        <p className="about-subtitle">
          一款使用现代 Web 技术构建的功能丰富、视觉炫酷的待办事项管理应用。
          让生产力管理变得优雅而有趣。
        </p>
        <div className="about-version">
          <i className="fas fa-code-branch"></i>
          <span>版本 2.0.0</span>
        </div>
      </div>

      <div className="about-sections">
        <div className="about-section animate__animated animate__fadeInLeft">
          <h2>
            <i className="fas fa-star" style={{ color: '#f59e0b' }}></i>
            核心功能
          </h2>
          <ul className="feature-list">
            <li>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <div>
                <strong>任务管理</strong>
                <p>创建、编辑、删除和组织任务，支持优先级、分类和截止日期。</p>
              </div>
            </li>
            <li>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <div>
                <strong>3D 视觉体验</strong>
                <p>使用 Three.js 打造的沉浸式 3D 背景，浮动几何体随鼠标移动产生视差效果。</p>
              </div>
            </li>
            <li>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <div>
                <strong>智能统计</strong>
                <p>全面的数据分析仪表盘，包含图表、连续打卡和成就徽章系统。</p>
              </div>
            </li>
            <li>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <div>
                <strong>暗色模式</strong>
                <p>自动跟随系统 + 手动切换主题，随时随地的舒适浏览体验。</p>
              </div>
            </li>
            <li>
              <i className="fas fa-check-circle" style={{ color: '#22c55e' }}></i>
              <div>
                <strong>隐私优先</strong>
                <p>所有数据仅保存在浏览器本地。没有服务器、无需账号、不追踪任何行为。</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="about-section animate__animated animate__fadeInRight">
          <h2>
            <i className="fas fa-microchip" style={{ color: '#8b5cf6' }}></i>
            技术栈
          </h2>
          <div className="tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className="tech-item magictime swap">
                <i className={`fas ${tech.icon}`} style={{ color: tech.color }}></i>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="about-tips animate__animated animate__fadeInUp">
        <h2>
          <i className="fas fa-lightbulb" style={{ color: '#f59e0b' }}></i>
          使用技巧
        </h2>
        <div className="tips-grid">
          {tips.map((tip, i) => (
            <div key={i} className="tip-card">
              <i className={`fas ${tip.icon}`}></i>
              <p>{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      <footer className="about-footer">
        <p>
          使用 <i className="fas fa-heart" style={{ color: '#ef4444' }}></i> React + TypeScript + Three.js 构建
        </p>
        <p>&copy; 2026 Fqin - ToDoList. All rights reserved.</p>
      </footer>
    </div>
  )
}
