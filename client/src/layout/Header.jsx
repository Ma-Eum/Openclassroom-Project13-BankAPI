import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../redux/userSlice'
import argentBankLogo from '../assets/img/argentBankLogo.png'

const Header = () => {
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
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
      </Link>

      <div>
        {isAuthenticated && userInfo ? (
          <>
            <Link to="/profile" className="main-nav-item user-link">
              <i className="fa fa-user-circle"></i> {userInfo.firstName}
            </Link>
            <span onClick={handleLogout} className="main-nav-item logout-link">
              <i className="fa fa-solid fa-right-from-bracket"></i>Sign Out
            </span>
          </>
        ) : (
          <Link to="/login" className="main-nav-item">
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Header