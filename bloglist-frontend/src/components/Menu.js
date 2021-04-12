import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'

const Menu = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const logout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className='navbar-brand' href='/'>Blog App</a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon' />
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item active'>
            <Link className='nav-link' to='/'>Blogs<span className='sr-only'>(current)</span></Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>Users</Link>
          </li>
        </ul>
        <form className='form-inline my-2 my-lg-0'>
          <div className='nav-link'>{user.name} logged in</div>
          <button className='btn btn-danger my-2 my-sm-0' onClick={logout}>Logout</button>
        </form>
      </div>
    </nav>
  )
}
export default Menu
