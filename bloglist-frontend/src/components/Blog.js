import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog }) => {
  const [details, showDetails] = useState(false)

  const toggleDetails = () => {
    showDetails(!details)
  }

  return (
    <div>
      {!details
        ? <div>{blog.title} {blog.author}<button onClick={toggleDetails}>View</button></div>
        : (
          <>
            <div>{blog.title} <button onClick={toggleDetails}>Hide</button></div>
            <div>{blog.url}</div>
            <div>likes {blog.likes}<button className='like-button' onClick={() => updateBlog(blog)}>like</button></div>
            <div>{blog.author}</div>
          </>
          )}
    </div>
  )
}
Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog
