import { useState } from 'react'

const Blog = ({ blog, createLike, removeBlog, userName }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showAll, setShowAll] = useState(false)

  const addLike = () => {
    createLike({
      user: blog.user.id,
      likes: blog.likes+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }, blog.id)
  }

  const deleteBlog = () => {
    removeBlog(blog.id)
  }

  const RemoveButton = () => {
    if (userName === blog.user.name) return (
      <button onClick={deleteBlog}>remove</button>
    )
    else return (<div></div>)
  }

  var userWhoAdded = ''
  if (typeof blog.user !== 'undefined') userWhoAdded = blog.user.name

  if (!showAll) return(
    <li style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(!showAll)}>show</button>
    </li>
  )

  if (showAll) return(
    <li style={blogStyle} className='blog' data-testid='unopenedblog'>
      {blog.title} {blog.author} <button onClick={() => setShowAll(!showAll)}>hide</button><br></br>
      {blog.url}<br></br>
      {blog.likes}<button onClick={addLike}>like</button><br></br>
      {userWhoAdded}<br></br>
      <RemoveButton id={blog.id}/>
    </li>
  )
}

export default Blog