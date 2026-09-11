import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const routes = [
  { to: '/', label: 'Users', element: <Users /> },
  { to: '/teams', label: 'Teams', element: <Teams /> },
  { to: '/activities', label: 'Activities', element: <Activities /> },
  { to: '/leaderboard', label: 'Leaderboard', element: <Leaderboard /> },
  { to: '/workouts', label: 'Workouts', element: <Workouts /> },
]

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
          <div className="container">
            <span className="navbar-brand fw-bold">Octofit Tracker</span>
            <div className="navbar-nav ms-auto d-flex flex-row gap-3">
              {routes.map((route) => (
                <NavLink
                  key={route.to}
                  to={route.to}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  {route.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>

        <main className="container py-4">
          <div className="alert alert-info mb-4">
            <strong>Codespaces config:</strong> define <code>VITE_CODESPACE_NAME</code> in{' '}
            <code>.env.local</code> to target GitHub Codespaces. If it is unset, the app safely falls back to localhost.
          </div>

          <Routes>
            {routes.map((route) => (
              <Route key={route.to} path={route.to} element={route.element} />
            ))}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
