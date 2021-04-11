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
  const padding = {
    paddingRight: 5
  }
  const userInfo = {
    display: 'inline-block'
  }
  const menu = {
    backgroundColor: '#b7b1b1',
    width: '100%',
    height: '35px',
    display: 'flex'
  }
  const menuList = {
    margin: 'auto 10px'

  }

  return (
    <div style={menu}>
      <div style={menuList}>
        <Link style={padding} to='/'>Blogs</Link>
        <Link style={padding} to='/users'>Users</Link>
        <div style={userInfo}>{user.name} logged in <button onClick={logout}>logout</button></div>
      </div>
    </div>
  )
}
export default Menu
