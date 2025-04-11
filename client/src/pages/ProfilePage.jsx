import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'
import accounts from '../mocks/mockAccounts'
import AccountCard from '../components/AccountCard'

// 📦 Appels API déplacés dans un service
import { fetchUserProfile, updateUserProfile } from '../services/authService'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const userInfo = useSelector((state) => state.user.userInfo)

  const [isEditing, setIsEditing] = useState(false)
  const [firstNameInput, setFirstNameInput] = useState('')
  const [lastNameInput, setLastNameInput] = useState('')
  const [error, setError] = useState(null)

  // 📡 Charger le profil utilisateur si non chargé
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const data = await fetchUserProfile(token)
        if (data.status === 200) {
          dispatch(setUserInfo(data.body))
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil :', err)
      }
    }

    if (token && !userInfo) {
      fetchInfo()
    }
  }, [token, userInfo, dispatch])

  const handleEditClick = () => {
    if (userInfo) {
      setFirstNameInput(userInfo.firstName)
      setLastNameInput(userInfo.lastName)
    }
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setError(null)
  }

  // 💾 Sauvegarder la mise à jour du nom/prénom
  const handleSave = async () => {
    try {
      const data = await updateUserProfile(token, firstNameInput, lastNameInput)
      if (data.status === 200) {
        dispatch(setUserInfo(data.body))
        setIsEditing(false)
        setError(null)
      } else {
        setError(data.message || 'Erreur lors de la mise à jour.')
      }
    } catch {
      setError('Une erreur est survenue lors de la mise à jour.')
    }
  }

  return (
    <main className="main bg-dark" aria-label="User profile">
      <section className="header" role="banner">
        {!isEditing ? (
          <>
            <h1>
              Welcome back
              <br />
              {userInfo ? `${userInfo.firstName} ${userInfo.lastName}!` : '...'}
            </h1>
            <button
              className="edit-button"
              onClick={handleEditClick}
              aria-label="Edit your name"
            >
              Edit Name
            </button>
          </>
        ) : (
          <form
            className="edit-form"
            onSubmit={(e) => {
              e.preventDefault()
              handleSave()
            }}
            aria-labelledby="edit-title"
          >
            <h2 id="edit-title">Edit your name</h2>
            <div className="input-wrapper">
              <label htmlFor="first-name">First Name</label>
              <input
                id="first-name"
                type="text"
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.target.value)}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="last-name">Last Name</label>
              <input
                id="last-name"
                type="text"
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.target.value)}
                required
              />
            </div>
            {error && (
              <p role="alert" aria-live="assertive" style={{ color: 'red' }}>
                {error}
              </p>
            )}
            <div>
              <button type="submit" className="edit-button">Save</button>
              <button type="button" className="edit-button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        )}
      </section>

      <section aria-label="Account summaries">
        {accounts.map((account, index) => (
          <AccountCard
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </section>
    </main>
  )
}

export default ProfilePage