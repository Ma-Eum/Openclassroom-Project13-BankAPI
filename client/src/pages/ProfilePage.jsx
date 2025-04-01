// src/pages/ProfilePage.jsx
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'
import accounts from '../mocks/mockAccounts'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const userInfo = useSelector((state) => state.user.userInfo)

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()
        if (data.status === 200) {
          dispatch(setUserInfo(data.body))
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil :', err)
      }
    }

    if (token && !userInfo) {
      fetchUserInfo()
    }
  }, [token, userInfo, dispatch])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {userInfo ? (
            <>
              {userInfo.firstName} {userInfo.lastName} !
            </>
          ) : (
            '...'
          )}
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>

      {/* Section comptes bancaires mockées */}
      {accounts.map((account, index) => (
        <section key={index} className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  )
}

export default ProfilePage