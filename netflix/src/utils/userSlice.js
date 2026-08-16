import { createSlice } from '@reduxjs/toolkit'

const savedUser = localStorage.getItem('user_info')
  ? JSON.parse(localStorage.getItem('user_info'))
  : null
const savedToken = localStorage.getItem('access_token') || null

const initialState = {
  user: savedUser,
  token: savedToken,
  isAuthenticated: !!savedToken,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
      state.isAuthenticated = !!action.payload
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload
    },
    addUser(state, action) {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    removeUser(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { setUser, setToken, setIsAuthenticated, addUser, removeUser } =
  userSlice.actions
export default userSlice.reducer