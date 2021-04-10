import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleForm = async (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    await addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h1>create new</h1>
      <form onSubmit={handleForm}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={author}
            name='Title'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={url}
            name='Title'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='new-blog-button' type='submit'>create</button>
      </form>
    </>
  )
}
BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
