import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS': {
      return action.data
    }
    case 'ADD_BLOG': {
      return state.concat(action.data)
    }
    case 'UPDATE_BLOG': {
      return state.map(b => (b.id === action.data.id ? { ...b, likes: action.data.likes } : b))
    }
    case 'CREATE_COMMENT_BLOG': {
      return state.map(b => (b.id === action.data.id ? action.data : b))
    }
    case 'REMOVE_BLOG': {
      return state.filter(b => b.id !== action.data.id)
    }
    default:
      return state
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    try {
      const blogs = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data: blogs
      })
    } catch {
      dispatch(setNotification('Error getting blogs', true))
    }
  }
}
export const createBlog = (blogObject) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blogObject)
      dispatch({
        type: 'ADD_BLOG',
        data: newBlog
      })
    } catch {
      dispatch(setNotification('the blog cannot be created', true))
    }
  }
}
export const updateBlog = (blog) => {
  return async dispatch => {
    try {
      const updatedBlog = await blogService.update(blog)
      dispatch({
        type: 'UPDATE_BLOG',
        data: updatedBlog
      })
    } catch {
      dispatch(setNotification('the blog cannot be updated', true))
    }
  }
}
export const createComment = (blogId, comment) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.createComment(blogId, comment)
      dispatch({
        type: 'CREATE_COMMENT_BLOG',
        data: newBlog
      })
    } catch {
      dispatch(setNotification('the blog cannot be updated', true))
    }
  }
}
export const removeBlog = (blog) => {
  return async dispatch => {
    try {
      await blogService.remove(blog)
      dispatch({
        type: 'REMOVE_BLOG',
        data: blog
      })
    } catch (e) {
      dispatch(setNotification('the blog cannot be removed', true))
    }
  }
}

export default blogReducer
