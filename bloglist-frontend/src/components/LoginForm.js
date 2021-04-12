import React from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { useField, useForm } from '../hooks'
import { Button, Container, Form } from 'react-bootstrap'
import Notification from './Notification'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const form = useForm([username, password])
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    form.reset()
    dispatch(loginUser(username.value, password.value))
  }

  return (
    <Container>
      <div className='row vh-100'>
        <div className='m-auto col-xs-6 bg-light p-5'>
          <h1 className='text-dark text-center text-uppercase'>log in to application</h1>
          <Notification />
          <Form onSubmit={handleSubmit} className='clearfix p-2'>
            <Form.Group>
              <Form.Control
                placeholder='Username'
                {...username}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                placeholder='Password'
                {...password}
              />
            </Form.Group>
            <Form.Group>
              <Button variant='primary' type='submit' className='mt-3 float-right'>
                login
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </Container>
  )
}

export default LoginForm
