import history from './history'

export function getToken () {
  return window.localStorage.getItem('token')
}

export function isAuthenticated () {
  return Boolean(getToken())
}

export function logout () {
  window.localStorage.removeItem('token')
  history.push('/')
}

export function setToken (token) {
  window.localStorage.setItem('token', token)
}
