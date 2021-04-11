import React, { useEffect, useRef } from 'react'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, removeBlog } from '../reducers/blogReducer'
import {
  Link
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

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

  return (
    <>
      <Togglable buttonLabel='new blog' ref={blogForm}>
        <BlogForm blogForm={blogForm} />
      </Togglable>
      <div id='blogs'>
        <Table striped>
          <tbody>
            {blogs.map(blog =>
              <tr key={blog.id}>
                <td>
                  <div>
                    <Link to={`blogs/${blog.id}`}>{blog.title}</Link>

                  </div>
                </td>
                <td>
                  {blog.user.name}
                </td>
                <td>
                  {
                      username === blog.user.username
                        ? <div><button className='remove-button' onClick={() => handleRemove(blog)}>Remove</button></div>
                        : null
                    }
                </td>
              </tr>

            )}
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Blogs
