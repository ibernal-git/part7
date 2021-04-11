import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogUsersReducer from './reducers/blogUsersReducer'

const reducer = combineReducers({
  user: userReducer,
  blogUsers: blogUsersReducer,
  blogs: blogReducer,
  notification: notificationReducer
})

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
