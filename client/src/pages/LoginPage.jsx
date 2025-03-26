import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginSuccess } from '../redux/userSlice'

// Composant page de connexion
const LoginPage = () => {
  const dispatch = useDispatch() // Permet d'envoyer des actions Redux
  const navigate = useNavigate() // Permet de rediriger vers une autre route

  // États locaux pour stocker les champs du formulaire
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Gestionnaire de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Requête POST vers l’API de login
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      // Si login réussi, on stocke le token et redirige vers /profile
      if (data.body?.token) {
        dispatch(loginSuccess({ token: data.body.token }))
        navigate('/profile')
      } else {
        setError(data.message || 'Échec de la connexion')
      }
    } catch (err) {
      console.error(err) // Pour le debug
      setError('Erreur de connexion au serveur.')
    }
  }

  return (
    <div className="login-page">
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Mot de passe :
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Se connecter</button>

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default LoginPage