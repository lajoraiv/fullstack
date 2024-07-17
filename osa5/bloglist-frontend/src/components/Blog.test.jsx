import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    user: 'matias',
    likes: 22,
    author: 'Matias Meikäläinen',
    title: 'Component testing is done with react-testing-library',
    url: 'www.test.com/test'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('renders content more content when show button is pressed', async () => {
  const blog = {
    user: 'matias',
    likes: 22,
    author: 'Matias Meikäläinen',
    title: 'Component testing is done with react-testing-library',
    url: 'www.test.com/test'
  }

  const { container } = render(<Blog blog={blog} />)
  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const div = container.querySelector('.blog')
  screen.debug(div)
  expect(div).toHaveTextContent('Matias Meikäläinen')
  expect(div).toHaveTextContent('www.test.com/test')
  expect(div).toHaveTextContent('22')

})

test('clicking the show button and then clicking the like button twice calls the event handler twice', async () => {
  const blog = {
    user: 'matias',
    likes: 22,
    author: 'Matias Meikäläinen',
    title: 'Component testing is done with react-testing-library',
    url: 'www.test.com/test'
  }

  const mockHandler = vi.fn()

  render(
    <Blog blog={blog} createLike={mockHandler}/>
  )

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)
  const button2 = screen.getByText('like')
  await user.click(button2)
  await user.click(button2)

  expect(mockHandler.mock.calls).toHaveLength(2)
})