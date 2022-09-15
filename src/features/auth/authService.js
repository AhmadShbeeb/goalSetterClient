import axios from 'axios'

// const API_URL = '/api/users/'
const API_URL = 'https://goalsetterapi.cyclic.app/api/users/'

// Register User
const register = async userData => {
  const response = await axios.post(API_URL, userData)

  if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}

// Logout user
const logout = () => {
  localStorage.removeItem('user')
}

const login = async userData => {
  const response = await axios.post(`${API_URL}login`, userData)

  if (response.data) localStorage.setItem('user', JSON.stringify(response.data))

  return response.data
}

const authService = {
  register,
  logout,
  login,
}

export default authService
