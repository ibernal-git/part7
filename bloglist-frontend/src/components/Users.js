import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/blogUsersReducer'
import { Link } from 'react-router-dom'

const Users = () => {
  const blogUsers = useSelector(({ blogUsers }) => blogUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th />
            <th>
              <strong>blogs created</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {blogUsers.map(user =>
            (
              <tr key={user.username}>
                <td>
                  <Link to={`users/${user.id}`}>{user.name}</Link>
                </td>
                <td>
                  {user.blogs.length}
                </td>
              </tr>
            )
          )}

        </tbody>
      </table>
    </div>
  )
}

export default Users
