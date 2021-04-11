import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER': {
      return action.data
    }
    case 'LOGIN_USER': {
      return action.data
    }
    case 'REMOVE_USER': {
      return action.data
    }
    default:
      return state
  }
}
export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user
      })
    }
  }
}
export const loginUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({
        type: 'LOGIN_USER',
        data: user
      })
    } catch {
      dispatch(setNotification('wrong credentials', true))
    }
  }
}
export const logoutUser = () => {
  window.localStorage.removeItem('loggedUser')
  return dispatch => {
    dispatch({
      type: 'REMOVE_USER',
      data: null
    })
  }
}
export default userReducer
