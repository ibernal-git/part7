import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const create = newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.post(baseUrl, newBlog, config)
  return response.then(response => response.data)
}
const update = blog => {
  const config = {
    headers: { Authorization: token }
  }
  blog.likes = blog.likes + 1
  const response = axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.then(response => response.data)
}
const createComment = (blogId, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = axios.post(`${baseUrl}/${blogId}/comments`, comment, config)
  return response.then(response => response.data)
}
const remove = blog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.then(response => response.data)
}

// eslint-disable-next-line
export default { getAll, setToken, create, update, remove, createComment }
