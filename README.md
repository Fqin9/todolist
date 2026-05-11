# Fqin - ToDoList

> 一款使用现代 Web 技术构建的功能丰富、视觉炫酷的待办事项管理应用。

## ✨ 功能特性

### 🎯 核心功能
- **任务管理** - 创建、编辑、删除任务，支持优先级（低/中/高/紧急）、分类（工作/个人/购物/健康/学习/其他）和截止日期
- **智能搜索** - 全文搜索标题和描述，快速定位任务
- **多维度排序** - 按时间、优先级、字母顺序排列任务
- **列表/紧凑视图** - 两种视图模式自由切换
- **二次确认删除** - 防止误删，点击两次才真正删除

### 🎨 视觉效果
- **3D 动态背景** - 使用 Three.js 实现的沉浸式 3D 场景，15+ 浮动几何体随机旋转 + 200 发光粒子，鼠标移动产生视差效果
- **玻璃拟态 (Glassmorphism)** - 全站毛玻璃效果 + backdrop-filter 模糊
- **打字机效果** - 首页标题逐字显示动画
- **数字滚动动画** - 统计数据从 0 滚动到目标值
- **渐变文字** - 多色渐变标题文字
- **SVG 进度环** - 动态圆形进度条
- **入场动画** - 使用 Animate.css + Magic.css 实现丰富的入场效果
- **浮动形状** - CSS 纯色渐变装饰形状

### 🌓 主题切换
- 亮色/暗色双模式
- 自动跟随系统主题
- 手动一键切换（带旋转动画）
- 使用 CSS 变量驱动的设计系统

### 📊 数据统计
- **概要卡片** - 总任务/已完成/待完成/已逾期 四维统计
- **分类柱状图** - 按分类展示任务分布
- **优先级环形图** - conic-gradient 实现的环形占比图
- **周活跃趋势** - 7 天柱状趋势图
- **成就系统** - 4 个可解锁成就徽章（任务大师/任务收藏家/七日连击/工作狂人）
- **综合完成率** - 大型 SVG 进度环

### 🔒 隐私安全
- 所有数据存储在浏览器 LocalStorage
- 无需后端服务器
- 无需注册账号
- 零数据追踪

---

## 🛠 技术栈

| 分类 | 技术 | 版本 |
|------|------|------|
| 前端框架 | **React** | 19 |
| 编程语言 | **TypeScript** | ~6.0 |
| 构建工具 | **Vite** | 8 |
| 路由 | **React Router DOM** | 7 |
| 3D 渲染 | **Three.js** | 0.176 |
| 图标库 | **Font Awesome** | 6.7.2 (CDN) |
| 动画库 | **Animate.css** | 4.1.1 (CDN) |
| 动画库 | **Magic.css** | 1.1.0 (CDN) |
| 悬停效果 | **Hover.css** | 2.3.2 (CDN) |
| 背景图案 | **Pattern.css** | 1.0.0 (CDN) |
| 轮播组件 | **Splide** | 4.1.4 (CDN) |
| 抖动效果 | **CSShake** | 1.7.0 (CDN) |
| 字体 | **Google Fonts** | Inter / Outfit / JetBrains Mono (CDN) |

---

## 📁 项目结构

```
ToDoList/
├── public/
│   └── favicon.svg
├── src/
│   ├── types/
│   │   └── index.ts              # Todo/Priority/Category/Stats 类型定义
│   ├── hooks/
│   │   ├── useTheme.ts           # 明暗主题 hook (localStorage + 系统检测)
│   │   └── useTodos.ts           # Todo CRUD + 过滤/搜索/排序/统计 hook
│   ├── components/
│   │   ├── Navbar.tsx             # 玻璃拟态导航栏 (页面路由 + 主题切换)
│   │   ├── ThreeBackground.tsx   # Three.js 3D 场景 (浮动几何体 + 粒子系统)
│   │   ├── TodoForm.tsx           # 创建/编辑任务表单 (优先级/分类/日期)
│   │   ├── TodoItem.tsx           # 单个任务卡片 (行内编辑/完成/删除)
│   │   └── TodoList.tsx           # 任务列表面板
│   ├── pages/
│   │   ├── Tasks.tsx              # 任务管理首页 (打字机效果 + 动画统计 + 任务CRUD)
│   │   ├── Stats.tsx              # 统计仪表盘 (图表 + 成就 + 趋势)
│   │   └── About.tsx              # 关于页 (功能介绍 + 技术栈 + 使用技巧)
│   ├── App.tsx                    # 根组件 (React Router 路由配置)
│   ├── main.tsx                   # React 入口 (StrictMode + BrowserRouter)
│   └── style.css                  # 全局样式 (设计系统 + 布局 + 组件样式 + 响应式)
├── index.html                     # HTML 入口 (CDN 引入 + 设计系统变量)
├── package.json                   # 依赖管理
├── tsconfig.json                  # TypeScript 配置
└── README.md                      # 项目文档
```

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- Yarn (推荐) 或 npm

### 安装与运行

```bash
# 1. 进入项目目录
cd ToDoList

# 2. 安装依赖
yarn install

# 3. 启动开发服务器
yarn dev

# 4. 构建生产版本
yarn build

# 5. 预览生产版本
yarn preview
```

---

## 🎨 设计系统

本项目的 CSS 变量设计系统支持亮色/暗色双主题：

| 变量 | 用途 |
|------|------|
| `--primary` / `--primary-light` | 主色调（靛蓝） |
| `--accent` | 强调色（粉红） |
| `--success` / `--warning` / `--danger` / `--info` | 语义色 |
| `--bg-primary` / `--bg-secondary` / `--bg-tertiary` | 背景层级 |
| `--bg-glass` / `--bg-glass-strong` | 毛玻璃效果背景 |
| `--text-primary` / `--text-secondary` / `--text-tertiary` | 文字层级 |
| `--border-light` / `--border-medium` | 边框色 |
| `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-full` | 圆角系统 |
| `--font-sans` / `--font-display` / `--font-mono` | 字体系统 |

---

## 📝 License

MIT © 2026
