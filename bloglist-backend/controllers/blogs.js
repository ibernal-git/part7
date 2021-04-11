const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { autenticate } = require('../utils/middleware')

/**
 * GET /api/blogs
 * Gets all the blogs from the database
 */
blogRouter.get('/', autenticate, async (_, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

/**
 * Post /api/blogs
 * Posts a new blog to the database
 */
blogRouter.post('/', autenticate, async (request, response) => {
  const { likes = 0, comments = [], ...newBlog } = request.body
  const user = await User.findById(request.token.id)

  const blog = new Blog({ ...newBlog, likes, comments, user: user._id })
  const savedBlog = await blog.save().then(b => b.populate('user', { username: 1, name: 1 }).execPopulate())
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

/**
 * DELETE /api/blogs/:id
 * Deletes a blog from the database
 */
blogRouter.delete('/:id', autenticate, async (request, response, next) => {
  const id = request.params.id
  const userId = request.token.id
  const blog = await Blog.findById(id)

  if (!blog) return next()

  if (blog.user.toString() === userId.toString()) {
    blog.delete()
    const user = await User.findById(blog.user)

    user.blogs = user.blogs.filter(b => b !== blog._id)
    await user.save()
    response.status(204).end()
  } else {
    response.status(401).send({ error: 'unauthorized' })
  }
})

/**
 * Put /api/blogs/:id
 * Updates a blog
 */
blogRouter.put('/:id', autenticate, async (request, response) => {
  const id = request.params.id
  const newInfo = {
    // title: request.body.title,
    likes: request.body.likes
  }
  const result = await Blog.findByIdAndUpdate(id, newInfo, { new: true })
  response.status(200).json(result)
})

module.exports = blogRouter

/**
 * Post /api/blogs/:id/comments
 * Post a comment for a blog
 */
blogRouter.post('/:id/comments', autenticate, async (request, response) => {
  const id = request.params.id
  const newComment = {
    content: request.body.content
  }
  const blog = await Blog.findById(id)
  blog.comments.push(newComment)
  const result = await blog.save()
  response.status(200).json(result)
})

module.exports = blogRouter
