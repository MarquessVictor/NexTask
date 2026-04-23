import { Link } from 'react-router-dom'
import { useAuth } from '../services/AuthContext.jsx'

export default function RequireAuth({ children, message }) {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="page">
        <div className="auth-required animate-in">
          <div className="auth-lock">🔐</div>
          <h2>Acesso <em>restrito</em></h2>
          <p>{message || 'Você precisa estar autenticado para acessar esta página.'}</p>
          <Link to="/cadastro" className="btn btn-accent">Fazer login →</Link>
        </div>
      </div>
    )
  }

  return children
}
