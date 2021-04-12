import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../reducers/blogUsersReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Users = () => {
  const blogUsers = useSelector(({ blogUsers }) => blogUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  return (
    <div className='col-md-12 p-4'>
      <h2 className='text-secondary text-uppercase'>Users</h2>
      <Table striped bordered hover className='col-md-12'>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
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
      </Table>
    </div>
  )
}

export default Users
