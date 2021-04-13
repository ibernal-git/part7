import blogReducer from './blogReducer'
import deepFreeze from 'deep-freeze'

const initBlogs = [{
  title: 'Test blog 1',
  author: 'Spencer',
  url: 'https://test1.com/test1',
  likes: 0,
  comments: [
    {
      content: 'comment test 1',
      id: '60746b9ab042de3ba4283906'
    }
  ],
  user: {
    username: 'test',
    name: 'Test',
    id: '6072def88cda3730c239eb87'
  },
  id: '6072df0f8cda3730c239eb88'
},
{
  title: 'Test blog 2',
  author: 'Charles',
  url: 'https://test2.com/test2',
  likes: 0,
  comments: [],
  user: {
    username: 'ibernal',
    name: 'Imanol Bernal',
    id: '6072bf155b28d8192e770c5b'
  },
  id: '607478c7b042de3ba4283907'
}]
const newBlog = {
  title: 'Test blog 3',
  author: 'Charles',
  url: 'https://test2.com/test2',
  likes: 0,
  comments: [],
  user: {
    username: 'ibernal',
    name: 'Imanol Bernal',
    id: '6072bf155b28d8192e770c5b'
  },
  id: '607478c7b042de3ba4283908'
}

describe('noteReducer', () => {
  test('returns blogs with action INIT_BLOGS', () => {
    const state = []
    const action = {
      type: 'INIT_BLOGS',
      data: initBlogs
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(2)
    expect(newState).toBe(initBlogs)
  })

  test('returns state with the new blog with action ADD_BLOG', () => {
    const state = initBlogs
    const action = {
      type: 'ADD_BLOG',
      data: newBlog
    }
    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(state.length + 1)
    expect(newState).toContainEqual(newBlog)
  })
  test('updates blog with comments with action CREATE_COMMENT_BLOG', () => {
    const state = initBlogs

    const blogWithComment = {
      title: 'Test blog 2',
      author: 'Charles',
      url: 'https://test2.com/test2',
      likes: 0,
      comments: ['comment1', 'comment2'],
      user: {
        username: 'ibernal',
        name: 'Imanol Bernal',
        id: '6072bf155b28d8192e770c5b'
      },
      id: '607478c7b042de3ba4283907'
    }
    const action = {
      type: 'CREATE_COMMENT_BLOG',
      data: blogWithComment
    }

    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(state.length)
    expect(newState).toContainEqual(blogWithComment)
  })
  test('removes a blog with action REMOVE_BLOG', () => {
    const state = initBlogs
    const blogToRemove = {
      title: 'Test blog 2',
      author: 'Charles',
      url: 'https://test2.com/test2',
      likes: 0,
      comments: [],
      user: {
        username: 'ibernal',
        name: 'Imanol Bernal',
        id: '6072bf155b28d8192e770c5b'
      },
      id: '607478c7b042de3ba4283907'
    }
    const action = {
      type: 'REMOVE_BLOG',
      data: blogToRemove
    }
    deepFreeze(state)
    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(state.length - 1)
    expect(newState).not.toContainEqual(blogToRemove)
  })
})
