import { NavLink } from 'react-router-dom'
import { useAuth } from '../services/AuthContext.jsx'

const navClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="logo">
          <span className="logo-mark">N</span>
          <span className="logo-text">NexTask<em>.</em></span>
        </NavLink>

        <div className="navbar-links">
          <NavLink to="/" end className={navClass}>Início</NavLink>
          {user && <NavLink to="/tarefas" className={navClass}>Tarefas</NavLink>}
          <NavLink to="/dupla" className={navClass}>Dupla</NavLink>
          <NavLink to="/cadastro" className={navClass}>Cadastro</NavLink>

          {user && (
            <div className="navbar-user">
              <img
                src={user.picture}
                alt={user.name}
                className="user-avatar"
                referrerPolicy="no-referrer"
              />
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <button className="logout-btn" onClick={logout}>Sair</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
