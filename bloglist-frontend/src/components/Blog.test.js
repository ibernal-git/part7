import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let blog
  let blogComponent
  let updateBlog
  let removeBlog

  beforeEach(() => {
    blog = {
      title: 'This is the title of the test blog',
      author: 'Imanol Bernal',
      url: 'https://testurl.com/testing',
      likes: 0,
      user: {
        username: 'ibernal',
        name: 'Imanol Bernal',
        id: '6065f74f511d60607f43bda2'
      }
    }
    updateBlog = jest.fn()
    removeBlog = jest.fn()
    blogComponent = render(
      <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
    )
  })

  test('blog shows title, author and hides url and likes', () => {
    blogComponent.getByText(`${blog.title} ${blog.author}`)
    expect(blogComponent.container).not.toHaveTextContent(blog.url)
    expect(blogComponent.container).not.toHaveTextContent(`likes ${blog.likes}`)
  })

  test('blog show url and likes when cliking view button', () => {
    const button = blogComponent.getByText('View')
    fireEvent.click(button)
    expect(blogComponent.container).toHaveTextContent(blog.url)
    expect(blogComponent.container).toHaveTextContent(`likes ${blog.likes}`)
  })

  test('updateBlog function calls 2 times when clicking twice on like button', () => {
    const viewButton = blogComponent.getByText('View')
    fireEvent.click(viewButton)
    const likeButton = blogComponent.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(updateBlog.mock.calls).toHaveLength(2)
    // expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})
