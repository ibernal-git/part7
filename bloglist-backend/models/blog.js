const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    content: {
      type: String
    }
  }]
})
blogSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.comments.map(comment => {
      comment.id = comment._id.toString()
      delete comment._id
      return comment
    })
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Blog', blogSchema)
