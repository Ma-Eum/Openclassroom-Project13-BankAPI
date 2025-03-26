import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav>
      <Link to="/">Argent Bank</Link>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Se déconnecter</button>
      ) : (
        <Link to="/login">Connexion</Link>
      )}
    </nav>
  )
}

export default Header