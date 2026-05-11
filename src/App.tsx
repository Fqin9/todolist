import { Routes, Route } from 'react-router-dom'
import { useTheme } from './hooks/useTheme'
import { useTodos } from './hooks/useTodos'
import ThreeBackground from './components/ThreeBackground'
import Navbar from './components/Navbar'
import Tasks from './pages/Tasks'
import Stats from './pages/Stats'
import About from './pages/About'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const {
    todos, allTodos, filter, setFilter, search, setSearch, sortBy, setSortBy,
    addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted, getStats,
  } = useTodos()

  return (
    <div className="app-container">
      <ThreeBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <Tasks
                todos={todos}
                allTodos={allTodos}
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                addTodo={addTodo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                clearCompleted={clearCompleted}
              />
            }
          />
          <Route
            path="/stats"
            element={<Stats getStats={getStats} allTodos={allTodos} />}
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}
