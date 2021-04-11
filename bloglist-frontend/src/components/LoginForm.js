import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField, useForm } from '../hooks'
import { Button, Form } from 'react-bootstrap'

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
    <Form onSubmit={handleSubmit} className='bg-light p-5 clearfix'>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          {...username}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          {...password}
        />
        <Button variant='primary' type='submit' className='mt-3 float-right'>
          login
        </Button>
      </Form.Group>
    </Form>
  )
}

export default LoginForm
