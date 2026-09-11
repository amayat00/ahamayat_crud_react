import { Routes, Route, Link, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'
import EditUser from './pages/EditUser'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition ${isActive ? 'text-brand' : 'text-slate hover:text-ink'}`

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-slate/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link to="/" className="font-display text-lg text-ink">
            mi-crud-react
          </Link>
          <nav className="flex gap-6">
            <NavLink to="/" end className={navLinkClass}>
              Inicio
            </NavLink>
            <NavLink to="/users" className={navLinkClass}>
              Usuarios
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<CreateUser />} />
          <Route path="/users/:id/edit" element={<EditUser />} />
        </Routes>
      </main>
    </div>
  )
}
