import { useState } from 'react'
import './App.css'

const initialTasks = [
  { id: 1, name: 'Python Assignment', subject: 'Programming', priority: 9, hours: 2, completed: false },
  { id: 2, name: 'Statistics Revision', subject: 'Statistics', priority: 7, hours: 2, completed: false },
  { id: 3, name: 'AI Assignment', subject: 'Artificial Intelligence', priority: 8, hours: 3, completed: false },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '', subject: '', priority: 5, hours: 1,
  })

  const totalHours = tasks.reduce((sum, task) => sum + Number(task.hours), 0)
  const completed = tasks.filter(task => task.completed).length
  const pending = tasks.length - completed

  const visibleTasks = tasks
    .filter(task => task.name.toLowerCase().includes(search.toLowerCase()))
    .filter(task => filter === 'All' ||
      (filter === 'Completed' ? task.completed : !task.completed))
    .sort((a, b) => b.priority - a.priority)

  function addTask(event) {
    event.preventDefault()
    setTasks([...tasks, {
      ...form,
      id: Date.now(),
      priority: Number(form.priority),
      hours: Number(form.hours),
      completed: false,
    }])
    setForm({ name: '', subject: '', priority: 5, hours: 1 })
    setShowForm(false)
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span className="brand-icon">✓</span> TaskFlow</div>
        <p className="nav-label">WORKSPACE</p>
        <div className="nav-item active">▦ &nbsp; Dashboard</div>
        <div className="nav-item">☷ &nbsp; My Tasks</div>
        <div className="nav-item">◷ &nbsp; Study Planner</div>

        <div className="sidebar-bottom">
          <div className="avatar">S</div>
          <div><strong>Student</strong><small>Learning workspace</small></div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Student Workspace / Dashboard</span>
          <span className="top-tag">✦ Stay focused, keep growing</span>
        </header>

        <section className="welcome">
          <div>
            <p className="eyebrow">YOUR PERSONAL STUDY SPACE</p>
            <h1>Good morning! 👋</h1>
            <p>Organize your work. Prioritize what matters. Make progress.</p>
          </div>
          <div className="welcome-art">📚</div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-top">Total tasks <span className="stat-icon purple">▤</span></div>
            <h2>{tasks.length}</h2>
            <small>All your assignments</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">Pending tasks <span className="stat-icon orange">◷</span></div>
            <h2>{pending}</h2>
            <small>Ready to work on</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">Completed <span className="stat-icon green">✓</span></div>
            <h2>{completed}</h2>
            <small>Tasks finished</small>
          </div>
          <div className="stat-card">
            <div className="stat-top">Study hours <span className="stat-icon blue">◴</span></div>
            <h2>{totalHours} <small>hrs</small></h2>
            <small>Estimated workload</small>
          </div>
        </section>

        <section className="task-panel">
          <div className="panel-heading">
            <div>
              <h2>My tasks</h2>
              <p>Manage your assignments and priorities</p>
            </div>
            <button className="add-button" onClick={() => setShowForm(!showForm)}>
              {showForm ? '✕ Close' : '+ Add new task'}
            </button>
          </div>

          {showForm && (
            <form className="task-form" onSubmit={addTask}>
              <input placeholder="Task name" value={form.name} required
                onChange={e => setForm({ ...form, name: e.target.value })} />
              <input placeholder="Subject" value={form.subject} required
                onChange={e => setForm({ ...form, subject: e.target.value })} />
              <label>Priority (1–10)
                <input type="number" min="1" max="10" value={form.priority} required
                  onChange={e => setForm({ ...form, priority: e.target.value })} />
              </label>
              <label>Hours
                <input type="number" min="1" value={form.hours} required
                  onChange={e => setForm({ ...form, hours: e.target.value })} />
              </label>
              <button className="add-button" type="submit">Save task</button>
            </form>
          )}

          <div className="toolbar">
            <input className="search" placeholder="⌕  Search tasks..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="All">All tasks</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>TASK NAME</th><th>SUBJECT</th><th>PRIORITY</th>
                  <th>HOURS</th><th>STATUS</th><th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {visibleTasks.map(task => (
                  <tr key={task.id}>
                    <td>
                      <div className="task-name">
                        <button
                          className={`check ${task.completed ? 'checked' : ''}`}
                          onClick={() => toggleTask(task.id)}
                          aria-label="Toggle task completion"
                        >{task.completed ? '✓' : ''}</button>
                        <span className={task.completed ? 'done' : ''}>{task.name}</span>
                      </div>
                    </td>
                    <td>{task.subject}</td>
                    <td><span className={`priority ${task.priority >= 8 ? 'high' : 'medium'}`}>
                      ● {task.priority}/10
                    </span></td>
                    <td>{task.hours} hrs</td>
                    <td><span className={`status ${task.completed ? 'complete' : 'pending'}`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span></td>
                    <td><button className="delete" onClick={() => deleteTask(task.id)}>Delete</button></td>
                  </tr>
                ))}
                {visibleTasks.length === 0 && (
                  <tr><td colSpan="6" className="empty">No tasks found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="table-footer">
            Showing {visibleTasks.length} of {tasks.length} tasks · Sorted by priority
          </p>
        </section>

        <footer>TaskFlow · Student Task Management System · CTP Project</footer>
      </main>
    </div>
  )
}

export default App