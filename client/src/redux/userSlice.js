import { createSlice } from '@reduxjs/toolkit'

// 🔄 Charger depuis localStorage si dispo
const savedToken = localStorage.getItem('token')
const savedUserInfo = localStorage.getItem('userInfo')

const initialState = {
  token: savedToken ? JSON.parse(savedToken) : null,
  userInfo: savedUserInfo ? JSON.parse(savedUserInfo) : null,
  isAuthenticated: !!savedToken,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.userInfo = action.payload.userInfo
      state.isAuthenticated = true

      // 💾 Sauvegarde dans localStorage
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
    },
    logout: (state) => {
      state.token = null
      state.userInfo = null
      state.isAuthenticated = false

      // 🧹 Nettoyage
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      localStorage.setItem('userInfo', JSON.stringify(action.payload))
    },
  },
})

export const { loginSuccess, logout, setUserInfo } = userSlice.actions
export default userSlice.reducer