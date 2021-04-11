import React, { useEffect } from 'react'
import './App.css'

import { useDispatch, useSelector } from 'react-redux'
import { initUser } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Menu from './components/Menu'
import BlogDetails from './components/BlogDetails'
import UserDetails from './components/UserDetails'
import Users from './components/Users'
import Header from './components/Header'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

  if (!user && window.localStorage.getItem('loggedUser') !== null) {
    return null
  }

  return (
    <div>
      {
        user === null
          ? <div><h1>log in to application</h1><Notification /><LoginForm /></div>
          : (
            <>
              <Router>
                <Menu />
                <Header />
                <Switch>
                  <Route path='/users/:id'>
                    <UserDetails />
                  </Route>
                  <Route path='/users'>
                    <Users />
                  </Route>
                  <Route path='/blogs/:id'>
                    <BlogDetails />
                  </Route>
                  <Route path='/'>
                    <Blogs />
                  </Route>
                </Switch>
              </Router>
            </>
            )
      }
    </div>
  )
}

export default App
