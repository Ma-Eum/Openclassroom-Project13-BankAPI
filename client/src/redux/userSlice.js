import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  userInfo: null,
  isAuthenticated: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: (state) => {
      state.token = null
      state.userInfo = null
      state.isAuthenticated = false
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { loginSuccess, logout, setUserInfo } = userSlice.actions
export default userSlice.reducer