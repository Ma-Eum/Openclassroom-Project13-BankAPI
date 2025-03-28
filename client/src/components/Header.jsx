// src/components/Header.jsx
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, userInfo } = useSelector((state) => state.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>

      <div>
      {isAuthenticated ? (
        <>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i> {userInfo?.firstName}
          </Link>
          <a href="#" className="main-nav-item" onClick={(e) => { e.preventDefault(); handleLogout(); }}>
            <i className="fa fa-sign-out"></i> Sign Out
          </a>
        </>
      ) : (
        <Link className="main-nav-item" to="/login">
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      )}
      </div>
    </nav>
  )
}

export default Header