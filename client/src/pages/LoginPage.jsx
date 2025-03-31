import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useNavigate, Navigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  // ✅ On appelle les hooks avant toute logique conditionnelle
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  // 🔐 Redirection directe si déjà connecté
  if (isAuthenticated) {
    return <Navigate to="/profile" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.status === 200) {
        dispatch(loginSuccess({ token: data.body.token }))
        navigate('/profile')
      } else {
        setError(data.message || 'Identifiants incorrects')
      }
    } catch {
      setError("Erreur lors de la connexion. Veuillez réessayer.")
    }
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Connexion</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Email :</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-wrapper">
            <label>Mot de passe :</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="sign-in-button">
            Se connecter
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </section>
    </main>
  )
}

export default LoginPage
