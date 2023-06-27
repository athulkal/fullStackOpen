import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('component displays blogs title and author by deafult and does not show url and likes by deault', async () => {
  const blog = {
    title: 'Multithreading Javascript',
    author: 'Max Peng',
    url: 'https://medium.com/techtrument/multithreading-javascript-46156179cf9a',
    likes: 12,
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText('Multithreading Javascript Max Peng')
  const elementUrl = await screen.queryByText(
    'https://medium.com/techtrument/multithreading-javascript-46156179cf9a'
  )
  const elementLike = await screen.queryByText('12')
  expect(element).toBeDefined()
  expect(elementUrl && elementLike).toBeNull()
})

test('blogs url and likes are shown when the view button is clicked', async () => {
  const blog = {
    title: 'Multithreading Javascript',
    author: 'Max Peng',
    url: 'https://medium.com/techtrument/multithreading-javascript-46156179cf9a',
    likes: 12,
    user: {
      name: 'angel',
    },
  }
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)

  const elementUrl = screen.getByText(
    'https://medium.com/techtrument/multithreading-javascript-46156179cf9a'
  )
  const elementLikes = screen.getByText(/likes/)
  expect(elementUrl && elementLikes).toBeDefined()
})

test('if the like button is clicked twice the event handler recieves the prop twice', async () => {
  const blog = {
    title: 'Multithreading Javascript',
    author: 'Max Peng',
    url: 'https://medium.com/techtrument/multithreading-javascript-46156179cf9a',
    likes: 12,
    user: {
      name: 'angel',
    },
    id: '1',
  }
  const addLikesHandler = jest.fn()
  render(<Blog blog={blog} addLikesHandler={addLikesHandler} />)

  const user = userEvent.setup()
  const view = screen.getByText('view')
  await user.click(view)
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  expect(addLikesHandler.mock.calls).toHaveLength(2)
})
