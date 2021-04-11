import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField, useForm } from '../hooks'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('text')
  const form = useForm([username, password])
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    form.reset()
    dispatch(loginUser(username.value, password.value))
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input id='username' {...username} />
      </div>
      <div>
        password
        <input id='password' {...password} />
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}

export default LoginForm
