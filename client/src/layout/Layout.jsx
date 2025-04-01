// src/layout/Layout.jsx
import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main bg-dark">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout