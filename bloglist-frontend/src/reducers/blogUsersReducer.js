import usersService from '../services/users'
import { setNotification } from './notificationReducer'

const blogUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS': {
      return action.data
    }
    default:
      return state
  }
}

export const getUsers = () => {
  return async dispatch => {
    try {
      const users = await usersService.getUsers()
      dispatch({
        type: 'INIT_USERS',
        data: users
      })
    } catch {
      dispatch(setNotification('Error getting users', true))
    }
  }
}

export default blogUsersReducer
