import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.status === 200) {
        dispatch(loginSuccess({ token: data.body.token }))
        navigate('/profile') // ✅ Redirection vers le profil
      } else {
        setError(data.message || 'Identifiants incorrects')
      }
    } catch {
      setError("Erreur lors de la connexion. Veuillez réessayer.")
    }
  }

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Se connecter</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage