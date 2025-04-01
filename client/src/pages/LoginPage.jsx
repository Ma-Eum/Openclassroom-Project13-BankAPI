import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import Layout from '../layout/Layout'

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
        navigate('/profile')
      } else {
        setError(data.message || 'Identifiants incorrects')
      }
    } catch {
      setError('Erreur lors de la connexion. Veuillez réessayer.')
    }
  }

  return (
    <Layout>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email">Username</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className="sign-in-button" type="submit">
              Sign In
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </section>
      </main>
    </Layout>
  )
}

export default LoginPage