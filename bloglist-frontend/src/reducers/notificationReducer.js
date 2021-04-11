const notification = { show: false, message: '', isError: false }

const notificationReducer = (state = notification, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION': {
      return { message: action.data.content, show: true, isError: action.data.isError }
    }
    case 'HIDE_NOTIFICATION': {
      return action.data
    }
    default:
      return state
  }
}

export const setNotification = (content, isError) => {
  return async dispatch => {
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        content,
        show: true,
        isError: isError
      }
    })

    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
    data: {
      message: '',
      show: false,
      isError: false
    }
  }
}

export default notificationReducer
