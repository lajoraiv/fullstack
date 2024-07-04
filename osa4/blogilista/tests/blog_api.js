const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('the first note is about React', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(e => e.title)
  assert(contents.includes('React patterns'))
})

test('the identifying parameter is id instead of _id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(e => Object.keys(e))
  assert(contents[0].includes('id'))
  assert(!contents[0].includes('_id'))
})

test('HTTP POST request adds a blog', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(contents.includes('Type wars'))
})

test('If no likes are specified, it is set to zero', async () => {
  const newBlog = {
    title: "Brand new blog with no likes",
    author: "A. U. Guy",
    url: "http://brandnew.blog"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.likes)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

  assert(contents.includes(0))
})

test('blog without title is not added', async () => {
  
  const newBlog = {
    author: "No data for you",
    url: 'https://aniceurl.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog without url is not added', async () => {
  
  const newBlog = {
    author: "No data for you",
    title: 'A nice title'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('blog can be deleted', async () => {

  const blogsAtStart = await helper.notesInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.notesInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(r => r.title)
  assert(!contents.includes(blogToDelete.title))
})

test('blog\'s likes can be updated', async () => {

  const blogsAtStart = await helper.notesInDb()
  const blogToUpdate = blogsAtStart[0]

  blogToUpdate.likes = 100
  console.log(blogToUpdate);

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)

  const blogsAtEnd = await helper.notesInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

  const contents = blogsAtEnd.map(r => r.likes)
  assert(contents.includes(blogToUpdate.likes))
})

after(async () => {
  await mongoose.connection.close()
})