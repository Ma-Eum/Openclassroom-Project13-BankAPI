import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../redux/userSlice'

const EditNameForm = ({ onClose }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const userInfo = useSelector((state) => state.user.userInfo)

  const [firstName, setFirstName] = useState(userInfo?.firstName || '')
  const [lastName, setLastName] = useState(userInfo?.lastName || '')
  const [error, setError] = useState(null)

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ firstName, lastName }),
      })

      const data = await response.json()
      if (data.status === 200) {
        dispatch(setUserInfo(data.body))
        onClose() // ✅ Revenir au mode lecture
      } else {
        setError(data.message || 'Une erreur est survenue')
      }
    } catch (err) {
        console.error('Erreur mise à jour du profil :', err)
        setError('Échec de la mise à jour. Veuillez réessayer.')
      }      
  }

  return (
    <form onSubmit={handleSave} className="edit-form">
      <div className="edit-inputs">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="edit-buttons">
        <button type="submit" className="edit-button">Save</button>
        <button type="button" className="edit-button" onClick={onClose}>Cancel</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  )
}

export default EditNameForm