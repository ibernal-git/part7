import React from 'react'
import { useField, useForm } from '../hooks'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'
import { ChatFill } from 'react-bootstrap-icons'

const Comments = ({ blogId, comments }) => {
  const comment = useField('text')
  const form = useForm([comment])
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newComment = {
      content: comment.value
    }
    dispatch(createComment(blogId, newComment))
    form.reset()
  }
  const commentsStyle = {
    marginTop: 50
  }
  const commentsIcon = {
    marginRight: 10,
    marginBottom: 3
  }

  return (
    <div className='col-md-6 float-right'>
      <div>
        <h2 className='text-secondary text-uppercase'>Comments</h2>
        <Form onSubmit={handleSubmit} className='mt-4'>
          <Form.Group>
            <Form.Control
              placeholder='Add a comment'
              {...comment}
            />
            <Button variant='info' type='submit' className='mt-3 float-right'>
              Comment
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        {
          !comments || comments.length === 0
            ? <p>No comments yet</p>
            : (
              <div style={commentsStyle}>
                {comments.map(comment => <li key={comment.id}><ChatFill style={commentsIcon} />{comment.content}</li>)}
              </div>
              )
        }
      </div>
    </div>
  )
}
export default Comments
