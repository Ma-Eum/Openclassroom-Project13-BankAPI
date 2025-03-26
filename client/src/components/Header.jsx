import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const userInfo = useSelector((state) => state.user.userInfo)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <header>
      <nav>
        <Link to="/">Argent Bank</Link>
        {isAuthenticated ? (
          <>
            <span>👤 {userInfo?.firstName || 'Utilisateur'}</span>
            <button onClick={handleLogout}>Se déconnecter</button>
          </>
        ) : (
          <Link to="/login">Se connecter</Link>
        )}
      </nav>
    </header>
  )
}

export default Header