import axiosInstance from '../utils/axiosInstance'

export const registerUser = async ({ username, email, password, phone }) => {
  try {
    const response = await axiosInstance.post('register/', {
      username,
      email,
      password,
      phone,
    })

    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access)
      localStorage.setItem('refresh_token', response.data.tokens.refresh)
      localStorage.setItem('user_info', JSON.stringify(response.data.user))
    }

    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      'Registration failed. Please try again.'
    throw new Error(errorMessage)
  }
}

export const loginUser = async ({ email, username, password }) => {
  try {
    const response = await axiosInstance.post('login/', {
      email,
      username,
      password,
    })

    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access)
      localStorage.setItem('refresh_token', response.data.tokens.refresh)
      localStorage.setItem('user_info', JSON.stringify(response.data.user))
    }

    return response.data
  } catch (error) {
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      'Login failed. Please check your credentials.'
    throw new Error(errorMessage)
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('me/')
    return response.data
  } catch (error) {
    throw error
  }
}

export const logoutUser = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('user_info')
}
