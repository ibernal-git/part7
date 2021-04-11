import React, { useEffect, useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog } from '../reducers/blogReducer'
import {
  Link
} from 'react-router-dom'

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs.sort((a, b) => b.likes - a.likes))
  const username = useSelector(({ user }) => user.username)

  const blogForm = useRef()

  useEffect(() => {
    if (username) {
      dispatch(initializeBlogs())
    }
  }, [dispatch, username])

  const handleRemove = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (result) {
      dispatch(removeBlog(blog))
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
        <BlogForm blogForm={blogForm} />
      </Togglable>
      <div id='blogs'>
        {blogs.map(blog =>
          (
            <div key={blog.id} style={blogStyle}>
              <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              {username === blog.user.username ? <div style={removeButton}><button className='remove-button' onClick={() => handleRemove(blog)}>Remove</button></div> : null}
            </div>
          )
        )}
      </div>
    </>
  )
}

export default Blogs
