import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Blog from './Blog'
import BlogForm from './BlogForm'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blogs = ({ username, setMessage, handleNotification }) => {
  const [blogs, setBlogs] = useState([])

  const blogForm = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      blogForm.current.toggleVisibility()
      handleNotification(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, false)
    } catch {
      handleNotification('the blog cannot be created, please fill in the following fields', true)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const returnedBlog = await blogService.update(blog)
      const updatedBlogs = blogs.map(b => (b.id === returnedBlog.id ? { ...b, likes: returnedBlog.likes } : b))
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      handleNotification('the blog cannot be updated', true)
    }
  }

  const removeBlog = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      try {
        await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (exception) {
        handleNotification('the blog cannot be removed', true)
      }
    }
  }
  const removeButton = {
    paddingTop: 10
  }
  const blogStyle = {
    border: '2px solid black',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    marginTop: 5,
    marginBottom: 5
  }

  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogForm}>
        <BlogForm
          addBlog={addBlog}
        />
      </Togglable>
      <div id='blogs'>
        {blogs.map(blog =>
          (
            <div key={blog.id} style={blogStyle}>
              <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
              {username === blog.user.username ? <div style={removeButton}><button className='remove-button' onClick={() => removeBlog(blog)}>Remove</button></div> : null}
            </div>
          )
        )}
      </div>
    </>
  )
}
Blogs.propTypes = {
  username: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
  handleNotification: PropTypes.func.isRequired
}

export default Blogs
