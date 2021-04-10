import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, waitFor } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<Blog />', () => {
  let addBlog
  let blogFormComponent
  let formContent

  beforeEach(() => {
    addBlog = jest.fn(() => Promise.resolve())
    blogFormComponent = render(
      <BlogForm
        addBlog={addBlog}
      />
    )
    formContent = {
      title: 'New Title',
      author: 'Imanol Bernal',
      url: 'https://testurl.com/testing'
    }
  })

  test('blog form recibes correct correct', async () => {
    const title = blogFormComponent.container.querySelector('#title')
    const author = blogFormComponent.container.querySelector('#author')
    const url = blogFormComponent.container.querySelector('#url')
    const form = blogFormComponent.container.querySelector('form')
    fireEvent.change(title, {
      target: { value: formContent.title }
    })
    fireEvent.change(author, {
      target: { value: formContent.author }
    })
    fireEvent.change(url, {
      target: { value: formContent.url }
    })

    fireEvent.submit(form)
    await waitFor(() => {
      expect(addBlog.mock.calls).toHaveLength(1)
      expect(addBlog.mock.calls[0][0].title).toBe(formContent.title)
      expect(addBlog.mock.calls[0][0].author).toBe(formContent.author)
      expect(addBlog.mock.calls[0][0].url).toBe(formContent.url)
    })
  })
})
