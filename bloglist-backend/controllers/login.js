const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  // We should generate refresh tokens to prevent the user session
  // from being closed after 15m (which is the temporary validity
  // of the token to avoid improper use of the tokens),
  // it would also be necessary to implement in the frontend
  // a method to intercept the request and obtain a new token when necessary.
  let timeToExpire = '15m'

  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
    timeToExpire = '30d'
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: timeToExpire })

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
