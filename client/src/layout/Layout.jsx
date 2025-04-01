// src/layout/Layout.jsx
import React from 'react'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import { Outlet, useLocation } from 'react-router-dom'

const Layout = () => {
  const location = useLocation()
  const isDarkBackground = location.pathname !== '/'

  return (
    <>
      <Header />
      <main className={isDarkBackground ? 'main bg-dark' : 'main'}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout