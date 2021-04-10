const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, value) => (sum + value.likes), 0)
}

const favoriteBlog = (blogs) => {
  if (typeof blogs === 'undefined' || blogs.length === 0) return {}
  return blogs
    .map((likes, ...blogs) => likes, ...blogs)
    .sort((a, b) => b.likes - a.likes)
    .map(elem => (
      {
        author: elem.author,
        likes: elem.likes,
        title: elem.title
      }
    ))
    .shift()
  // return typeof result === 'undefined' ? {} : result
}
const mostBlogs = (blogs) => {
  if (typeof blogs === 'undefined' || blogs.length === 0) return {}

  const author = _(blogs)
    .maxBy('author')
    .author

  const getMostBlogs = _(blogs)
    .groupBy('author')
    .pick(author)
    .value()

  return { author: author, blogs: getMostBlogs[author].length }
}
const mostLikes = (blogs) => {
  if (typeof blogs === 'undefined' || blogs.length === 0) return {}
  const getMostLikes = _(blogs)
    .groupBy('author')
    .value()

  let likes = 0
  let authorWithMostLikes = {}

  for (const author in getMostLikes) {
    const result = getMostLikes[author].map(likes => likes.likes).reduce((a, b) => a + b, 0)
    if (result > likes) {
      likes = result
      authorWithMostLikes = { author: author, likes: likes }
    }
  }
  return authorWithMostLikes
  // return _.isEmpty(authorWithMostLikes) ? undefined : authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
