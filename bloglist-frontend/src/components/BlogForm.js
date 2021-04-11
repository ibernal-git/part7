import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField, useForm } from '../hooks'

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
    <>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input id='title' {...title} />
        </div>
        <div>
          author:
          <input id='author' {...author} />
        </div>
        <div>
          url:
          <input id='url' {...url} />
        </div>
        <button id='new-blog-button' type='submit'>create</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  blogForm: PropTypes.object.isRequired
}

export default BlogForm
