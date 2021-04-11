import React from 'react'
import { useField, useForm } from '../hooks'
import { useDispatch } from 'react-redux'
import { createComment } from '../reducers/blogReducer'

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
    marginTop: 20
  }

  return (
    <>
      <h2>comments</h2>
      <form onSubmit={handleSubmit}>
        <input id='comment' {...comment} />
        <button id='new-comment-button' type='submit'>add comemnt</button>
      </form>
      {
      !comments || comments.length === 0
        ? <p>No comments yet</p>
        : <div style={commentsStyle}>{comments.map(comment => <li key={comment.id}>{comment.content}</li>)}</div>
    }
    </>
  )
}
export default Comments
