
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'test1',
    author: 'Imanol Bernal',
    url: 'http://test1.com/test1',
    likes: 100
  },
  {
    title: 'test2',
    author: 'Imanol Bernal',
    url: 'http://test2.com/test2',
    likes: 12
  }
]

const newBlog = {
  title: 'test',
  author: 'Imanol Bernal',
  url: 'http://test1.com/test1',
  likes: 100
}

const newBlogWithoutLikes = {
  title: '0likes',
  author: 'Imanol Bernal',
  url: 'http://test1.com/test1'
}

const newBlogWithoutTitle = {
  author: 'Imanol Bernal'
}

const initialUsers = [
  {
    name: 'Imanol Bernal',
    username: 'ibernal',
    password: '1234'
  },
  {
    name: 'Other user',
    username: 'other',
    password: '1234'
  }
]
const newUser = {
  name: 'Matias',
  username: 'matti',
  password: '1234'
}
const secondUser = {
  name: 'Otto',
  username: 'otto',
  password: '1234'
}
const newUserWithoutUsername = {
  name: 'Matias',
  password: '1234'
}
const newUserWithoutPassword = {
  name: 'Matias',
  username: 'matti'
}
const sameUsername = {
  name: 'Matias',
  username: 'ibernal',
  password: '1234'
}
const newUserWithShortUsername = {
  name: 'Matias',
  username: 'm',
  password: '1234'
}
const newUserWithShortPassword = {
  name: 'Other',
  username: 'other',
  password: '1'
}
const createUser = async () => {
  const response = await api.post('/api/users')
    .send(newUser)
  return response.body.id
}
const getToken = async () => {
  const response = await api.post('/api/login')
    .send({ username: 'matti', password: '1234' })
  return response.body.token
}
const getSecondUserToken = async () => {
  const response = await api.post('/api/login')
    .send({ username: 'otto', password: '1234' })
  return response.body.token
}
const getAllBlogs = async () => {
  const token = await getToken()
  const response = await api.get('/api/blogs')
    .set({ Authorization: `Bearer ${token}` })
  return {
    ids: response.body.map(r => r.id),
    titles: response.body.map(r => r.title),
    response
  }
}
const getAllUsers = async () => {
  const response = await api.get('/api/users')
  return {
    ids: response.body.map(r => r.id),
    usernames: response.body.map(r => r.username),
    response
  }
}
const decodedToken = async (token) => {
  return await jwt.verify(token, process.env.SECRET)
}

module.exports = {
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  mongoose,
  api,
  getAllBlogs,
  initialUsers,
  newUser,
  secondUser,
  sameUsername,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortUsername,
  newUserWithShortPassword,
  createUser,
  getToken,
  getSecondUserToken,
  decodedToken,
  getAllUsers
}
