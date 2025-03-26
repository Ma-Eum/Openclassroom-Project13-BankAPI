// src/components/UserInfoEditor.jsx

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'

/**
 * Composant permettant d’éditer le prénom et le nom de l’utilisateur connecté
 * Utilise Redux pour récupérer et mettre à jour les infos du profil
 */
function UserInfoEditor() {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state) => state.user)

  const [editMode, setEditMode] = useState(false)
  const [firstName, setFirstName] = useState(userInfo?.firstName || '')
  const [lastName, setLastName] = useState(userInfo?.lastName || '')

  // Simulation d’une MAJ API côté back-end (à remplacer plus tard)
  const handleSave = () => {
    // 🔄 Simule l’envoi au serveur (à remplacer par un appel API réel)
    dispatch(setUserInfo({ firstName, lastName }))
    setEditMode(false)
  }

  const handleCancel = () => {
    // Réinitialise les champs et annule l’édition
    setFirstName(userInfo?.firstName || '')
    setLastName(userInfo?.lastName || '')
    setEditMode(false)
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
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
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