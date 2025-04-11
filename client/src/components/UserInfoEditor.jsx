import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'

// 🔁 Ajout de l'appel réel à l'API
import { updateUserProfile } from '../services/authService'

/**
 * Composant permettant d’éditer le prénom et le nom de l’utilisateur connecté
 * Utilise Redux pour récupérer et mettre à jour les infos du profil
 */
function UserInfoEditor() {
  const dispatch = useDispatch()
  const { userInfo, token } = useSelector((state) => state.user)

  const [editMode, setEditMode] = useState(false)
  const [firstName, setFirstName] = useState(userInfo?.firstName || '')
  const [lastName, setLastName] = useState(userInfo?.lastName || '')
  const [error, setError] = useState(null)

  const handleSave = async () => {
    try {
      const data = await updateUserProfile(token, firstName, lastName)

      if (data.status === 200) {
        dispatch(setUserInfo(data.body))
        setEditMode(false)
        setError(null)
      } else {
        setError(data.message || 'Erreur lors de la mise à jour.')
      }
    } catch (err) {
      setError('Une erreur est survenue.')
      console.error(err)
    }
  }

  const handleCancel = () => {
    setFirstName(userInfo?.firstName || '')
    setLastName(userInfo?.lastName || '')
    setEditMode(false)
    setError(null)
  }

  return (
    <div className="header">
      {editMode ? (
        <div>
          <h1>Edit your name</h1>
          <div className="edit-name-form">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSave}>Save</button>
            <button className="cancel-button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>
            Welcome back<br />
            {userInfo?.firstName} {userInfo?.lastName}!
          </h1>
          <button className="edit-button" onClick={() => setEditMode(true)}>
            Edit Name
          </button>
        </div>
      )}
    </div>
  )
}

export default UserInfoEditor