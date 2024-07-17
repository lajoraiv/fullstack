import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const author = screen.getByPlaceholderText('author')
  const title = screen.getByPlaceholderText('title')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(author, 'Testi Testinen')
  await user.type(title, 'Testi Artikkeli')
  await user.type(url, 'www.test.com')
  await user.click(sendButton)

  console.log(createBlog.mock.calls)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Artikkeli')
  expect(createBlog.mock.calls[0][0].author).toBe('Testi Testinen')
  expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
})