import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Dupla from './pages/Dupla.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Tarefas from './pages/Tarefas.jsx'

class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', color: '#ff5470', background: '#0d0b08', minHeight: '100vh' }}>
          <div style={{ fontSize: 13, opacity: 0.5, marginBottom: 8 }}>// runtime error</div>
          <pre style={{ fontSize: 14, whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tarefas" element={<Tarefas />} />
        <Route path="/dupla" element={<Dupla />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="footer">
        NexTask <span className="footer-star">✺</span> Victor Marques <span className="footer-star">&</span> Gabriel Paiva <span className="footer-star">·</span> 2026
      </footer>
    </div>
    </ErrorBoundary>
  )
}
