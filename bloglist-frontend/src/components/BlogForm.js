import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField, useForm } from '../hooks'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ blogForm }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const form = useForm([title, author, url])

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog))
    form.reset()
    blogForm.current.toggleVisibility()
  }

  return (
    <div className='col-md-6 m-4'>
      <h2 className='text-secondary'>create new</h2>
      <Form onSubmit={handleSubmit} className='flex-v-center'>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control {...title} />
          <Form.Label>Author:</Form.Label>
          <Form.Control {...author} />
          <Form.Label>Url:</Form.Label>
          <Form.Control {...url} />
          <Button variant='primary' type='submit' className='mt-3 float-right'>
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
BlogForm.propTypes = {
  blogForm: PropTypes.object.isRequired
}

export default BlogForm
