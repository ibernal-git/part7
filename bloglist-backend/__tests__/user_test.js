/* global test, describe, expect, afterAll, beforeEach */

const User = require('../models/user')
const {
  mongoose,
  api,
  initialUsers,
  getAllUsers,
  getSecondUserToken,
  newUser,
  secondUser,
  newUserWithoutUsername,
  newUserWithoutPassword,
  newUserWithShortPassword,
  newUserWithShortUsername,
  sameUsername
} = require('../utils/tests_helper')

beforeEach(async () => {
  await User.deleteMany({})

  // secuential
  for (const user of initialUsers) {
    const userObject = new User(user)
    await userObject.save()
  }
})

describe('fetching users from /api/users', () => {
  test('is returned as json', async () => {
    await api.post('/api/users')
      .send(secondUser)
    const token = await getSecondUserToken()
    await api
      .get('/api/blogs')
      .set({ Authorization: `Bearer ${token}` })
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('expects an id property as identifier', async () => {
    const { ids } = await getAllUsers()
    expect(ids.length).not.toBe(0)

    ids.forEach(id => {
      expect(id).toBeDefined()
      // expect(typeof id).toBe('string')
    })
  })
  test('expects username property', async () => {
    const { usernames } = await getAllUsers()
    expect(usernames).toEqual(initialUsers.map(u => u.username))
  })
})

describe('posting users to /api/users', () => {
  test('creates a new user', async () => {
    const response = await api.post('/api/users')
      .expect(201)
      .send(newUser)

    expect(response.body.username).toBe(newUser.username)
    expect(response.body.name).toBe(newUser.name)
    expect(response.body.passwordHash).not.toBeDefined()
  })

  test('doesn\'t creates a new user if the username is already in the database', async () => {
    const response = await api.post('/api/users')
      .expect(400)
      .send(sameUsername)
    const { ids } = await getAllUsers()
    expect(ids).toHaveLength(initialUsers.length)
    expect(response.body.error).toContain('User validation failed: username')
  })

  test('doesn\'t creates a new user if the username is shorter than 3', async () => {
    const response = await api.post('/api/users')
      .expect(400)
      .send(newUserWithShortUsername)
    const { ids } = await getAllUsers()
    expect(ids).toHaveLength(initialUsers.length)
    expect(response.body.error).toContain('User validation failed: username')
  })

  test('doesn\'t creates a new user if the password is shorter than 3', async () => {
    const response = await api.post('/api/users')
      .expect(400)
      .send(newUserWithShortPassword)

    const { ids } = await getAllUsers()
    expect(ids).toHaveLength(initialUsers.length)
    expect(response.body.error).toContain('User validation failed: password format not valid')
  })

  test('doesn\'t creates a new user if there is no username', async () => {
    const response = await api.post('/api/users')
      .expect(400)
      .send(newUserWithoutUsername)

    const { ids } = await getAllUsers()
    expect(ids).toHaveLength(initialUsers.length)
    expect(response.body.error).toContain('User validation failed: username')
  })

  test('doesn\'t creates a new user if there is no password', async () => {
    const response = await api.post('/api/users')
      .expect(400)
      .send(newUserWithoutPassword)

    const { ids } = await getAllUsers()
    expect(ids).toHaveLength(initialUsers.length)
    expect(response.body.error).toContain('User validation failed: password format not valid')
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
