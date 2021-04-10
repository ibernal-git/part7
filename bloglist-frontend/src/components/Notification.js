import React from 'react'

const Notification = ({ message, isError }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isError ? 'error' : 'info'}>
      {message}
    </div>
  )
}

export default Notification
