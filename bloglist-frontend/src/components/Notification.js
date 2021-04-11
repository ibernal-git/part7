import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)

  if (notification.show === true) {
    return (
      <div className={notification.isError ? 'error' : 'info'}>
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notification
