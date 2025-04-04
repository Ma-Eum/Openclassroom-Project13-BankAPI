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
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  return (
    <main className="main bg-dark" aria-label="Login page">
      <section
        className="sign-in-content"
        aria-labelledby="signin-title"
        role="form"
      >
        <i className="fa fa-user-circle sign-in-icon" aria-hidden="true"></i>
        <h1 id="signin-title">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-required="true"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button" type="submit">Sign In</button>
          {error && (
            <p role="alert" aria-live="assertive" style={{ color: 'red' }}>
              {error}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default LoginPage