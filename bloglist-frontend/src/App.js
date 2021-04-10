import React, { useState, useEffect } from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username, password

      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUser(user)
    } catch (exception) {
      handleNotification('wrong credentials', true)
    }
  }

  const handleNotification = (message, isError) => {
    setIsError(isError)
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <div>
      {
        user === null
          ? <div><h1>log in to application</h1><Notification message={message} isError={isError} /><LoginForm login={login} /></div>
          : (
            <div>
              <h1>Blogs</h1>
              <Notification message={message} isError={isError} />
              <p>{user.name} logged in
                <button onClick={logout}>
                  logout
                </button>
              </p>
              <Blogs username={user.username} setMessage={setMessage} handleNotification={handleNotification} />
            </div>
            )
      }
    </div>
  )
}

export default App
