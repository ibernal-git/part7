import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getUsers } from '../reducers/blogUsersReducer'

const UserDetails = () => {
  const { id } = useParams()
  const user = useSelector(({ blogUsers }) => blogUsers.find(user => user.id === id))
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <p><strong>added Blogs</strong></p>
      {user.blogs.map(blog => {
        return <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
      })}
    </div>
  )
}
export default UserDetails
