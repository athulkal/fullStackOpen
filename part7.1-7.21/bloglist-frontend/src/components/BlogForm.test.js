import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('the form calls the event handler with right parameters', async () => {
  const title = 'testing'
  const author = 'me'
  const url = 'www.testing.com'
  const createBlog = jest.fn()
  const { container } = render(<BlogForm createBlog={createBlog} />)
  // selecting input fields
  const titleElement = container.querySelector('#title')
  const authorElement = container.querySelector('#author')
  const urlElement = container.querySelector('#url')
  await userEvent.type(titleElement, title)
  await userEvent.type(authorElement, author)
  await userEvent.type(urlElement, url)
  //selecting save button
  const saveBtn = screen.getByText('Create')
  await userEvent.click(saveBtn)
  console.log('testing params', createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('testing')
  expect(createBlog.mock.calls[0][0].author).toBe('me')
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com')
})
