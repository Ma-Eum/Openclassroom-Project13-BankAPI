import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  return (
    <section>
      <h1>Profil utilisateur</h1>
      <p>Bienvenue sur votre espace personnel.</p>
    </section>
  )
}

export default ProfilePage