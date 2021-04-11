import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector(({ blogs }) => blogs.find(blog => blog.id === id))

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleUpdate = async (blog) => {
    try {
      dispatch(updateBlog(blog))
    } catch (exception) {
      dispatch(setNotification('the blog cannot be updated', true))
    }
  }

  if (!blog) {
    return null
  }
  return (
    <>
      <h1>{blog.title}</h1>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>likes {blog.likes}<button className='like-button' onClick={() => handleUpdate(blog)}>like</button></div>
      <div>added by {blog.author}</div>
      <Comments blogId={blog.id} comments={blog.comments} />
    </>
  )
}
export default BlogDetails
