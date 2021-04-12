import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initializeBlogs, updateBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Comments from './Comments'
import { Button } from 'react-bootstrap'

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
    <div className='p-4 col-md-12'>
      <div className='col-md-6 float-left mb-4'>
        <h2 className='text-secondary text-uppercase'>{blog.title}</h2>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div className='mt-2'>Likes <strong>{blog.likes}</strong>
          <Button variant='info' onClick={() => handleUpdate(blog)} className='ml-2'>Like</Button>
        </div>
        <div className='mt-2'>Author <strong>{blog.author}</strong></div>
      </div>

      <Comments blogId={blog.id} comments={blog.comments} />
    </div>
  )
}
export default BlogDetails
