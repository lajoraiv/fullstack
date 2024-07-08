import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
  
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setNotificationType("success")
        setErrorMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      })
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      console.log(user.token);
      blogService.setToken(user.token);
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setNotificationType("error")
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  
  const blogForm = () => (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        title:
        <input
          value={newTitle}
          onChange={handleTitleChange}
        /><br></br>
        author:
        <input
          value={newAuthor}
          onChange={handleAuhtorChange}
        /><br></br>
        url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        /><br></br>
        <button type="submit">create</button>
      </form>
    </div> 
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuhtorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const logout = () => {
    window.localStorage.clear()
    location.reload()
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} type={notificationType} />

      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => logout()}> 
            logout
          </button>
          {blogForm()}
          <div>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog}  />
            )}
          </div>
        </div>
      }
    </div>

  )
}

export default App