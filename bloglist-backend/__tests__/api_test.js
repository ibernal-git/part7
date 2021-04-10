/* global describe, test, expect, beforeEach, afterAll */

const Blog = require('../models/blog')
const User = require('../models/user')
const {
  mongoose,
  api,
  initialBlogs,
  newBlog,
  newBlogWithoutLikes,
  newBlogWithoutTitle,
  secondUser,
  getToken,
  getSecondUserToken,
  decodedToken,
  getAllBlogs,
  createUser
} = require('../utils/tests_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const id = await createUser()

  const user = await User.findById(id)

  // secuential
  for (const blog of initialBlogs) {
    const blogObject = new Blog(blog)
    blogObject.user = user._id
    user.blogs = user.blogs.concat(blogObject._id)
    await user.save()
    await blogObject.save()
  }
})
describe('fetching blogs from /api/blogs', () => {
  test('is returned as json', async () => {
    const token = await getToken()
    await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('expects an id property as identifier', async () => {
    const { ids } = await getAllBlogs()
    expect(ids.length).not.toBe(0)

    ids.forEach(id => {
      expect(id).toBeDefined()
      // expect(typeof id).toBe('string')
    })
  })
})
describe('posting a blog to /api/blogs', () => {
  test('creates a new blog', async () => {
    const token = await getToken()
    const response = await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .send(newBlog)

    const tokenInfo = await decodedToken(token)
    const { titles } = await getAllBlogs()

    expect(titles).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
    expect(response.body.user.id).toBe(tokenInfo.id)
  })
  test('fails if there is no token in header', async () => {
    await api.post('/api/blogs')
      .expect(401)
      .expect('Content-Type', /application\/json/)
      .send(newBlog)

    const { titles } = await getAllBlogs()

    expect(titles).toHaveLength(initialBlogs.length)
    expect(titles).not.toContain(newBlog.title)
  })

  test('expect 0 likes if there is no likes property in request', async () => {
    const token = await getToken()
    const response = await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlogWithoutLikes)
    expect(response.body.likes).toBe(0)
  })

  test('expect 400 response error if there is no title or url property in request', async () => {
    const token = await getToken()
    await api.post('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .send(newBlogWithoutTitle)
      .expect(400)

    const { ids } = await getAllBlogs()

    expect(ids).toHaveLength(initialBlogs.length)
  })
})

describe('deleting a blog', () => {
  test('expect a 204 status code and the element deleted from database', async () => {
    const token = await getToken()
    const { ids } = await getAllBlogs()
    await api.delete(`/api/blogs/${ids[0]}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)
    const { ids: idsAfterDelete } = await getAllBlogs()
    expect(ids).toHaveLength(idsAfterDelete.length + 1)
  })

  test('expect a 401 unathorized if a diferrent user try to delete a blog', async () => {
    await api.post('/api/users')
      .send(secondUser)
    const token = await getSecondUserToken()
    const { ids } = await getAllBlogs()
    await api.delete(`/api/blogs/${ids[0]}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(401)
    const { ids: idsAfterDelete } = await getAllBlogs()
    expect(ids).toHaveLength(idsAfterDelete.length)
  })
})

describe('updating a blog', () => {
  test('expect a 200 status code and the new element returned, only is possible to update the likes', async () => {
    const updatedBlog = {
      title: 'New title',
      author: 'New Author',
      url: 'http://newurl.com/new',
      likes: 10000
    }

    const { ids } = await getAllBlogs()
    const token = await getToken()
    const response = await api.put(`/api/blogs/${ids[0]}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .send(updatedBlog)
    expect(response.body.title).not.toBe(updatedBlog.title)
    expect(response.body.author).not.toBe(updatedBlog.author)
    expect(response.body.url).not.toBe(updatedBlog.url)
    expect(response.body.likes).toBe(updatedBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
