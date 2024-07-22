const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Lassi Raivonen',
        username: 'lajoraiv',
        password: 'salainen'
      }
    })
    await request.post('http://localhost:3001/api/users', {
      data: {
        name: 'Lassi Raivonen2',
        username: 'lajoraiv2',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })
  
  test('front page can be opened', async ({ page }) => {
    const locator = await page.getByText('Blogs')
    await expect(locator).toBeVisible()
    await expect(page.getByText('Blogs')).toBeVisible()
  })
  describe('Login', () => {
    test('fails with wrong password', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('lajoraiv')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })

    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('lajoraiv')
      await page.getByTestId('password').fill('salainen')  
      await page.getByRole('button', { name: 'login' }).click() 
      await expect(page.getByText('Lassi Raivonen logged in')).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('lajoraiv')
      await page.getByTestId('password').fill('salainen')  
      await page.getByRole('button', { name: 'login' }).click() 
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('author').fill('playwright')
      await page.getByTestId('title').fill('a blog created by playwright')
      await page.getByTestId('url').fill('www.playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await expect(await page.getByText('a new blog a blog created by playwright by playwright added')).toBeVisible()
    })

    describe('and a blog exists', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByTestId('author').fill('playwright')
        await page.getByTestId('title').fill('a blog created by playwright')
        await page.getByTestId('url').fill('www.playwright.com')
        await page.getByRole('button', { name: 'create' }).click()
      })
  
      test('blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await page.reload()
        await page.getByRole('button', { name: 'show' }).click()
        await expect(await page.getByText('1')).toBeVisible()
      })

      test('blog can be removed', async ({ page }) => {
        await page.getByRole('button', { name: 'show' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'remove' }).click()
        await page.reload()
        await expect(await page.getByText('a blog created by playwright playwright')).not.toBeVisible()
      })

      test('blog cannot be removed by user who did not add the blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await page.getByRole('button', { name: 'log in' }).click()
        await page.getByTestId('username').fill('lajoraiv2')
        await page.getByTestId('password').fill('salainen')  
        await page.getByRole('button', { name: 'login' }).click()
        await page.getByRole('button', { name: 'show' }).click()
        await expect(await page.getByText('remove')).not.toBeVisible()
      })
    })
  })

  describe('blog are sorted in most liked order',  () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
      await page.getByTestId('username').fill('lajoraiv')
      await page.getByTestId('password').fill('salainen')  
      await page.getByRole('button', { name: 'login' }).click() 
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('author').fill('playwright')
      await page.getByTestId('title').fill('a blog created by playwright')
      await page.getByTestId('url').fill('www.playwright.com')
      await page.getByRole('button', { name: 'create' }).click()
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.reload()
      await page.getByRole('button', { name: 'show' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.reload()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('author').fill('playwright2')
      await page.getByTestId('title').fill('a blog created by playwright2')
      await page.getByTestId('url').fill('www.playwright.com2')
      await page.getByRole('button', { name: 'create' }).click()
      await page.reload()
      await page.getByRole('button', { name: 'show' }).last().click()
      await page.getByRole('button', { name: 'like' }).click()
      await page.reload()
      await page.getByRole('button', { name: 'new blog' }).click()
      await page.getByTestId('author').fill('playwright3')
      await page.getByTestId('title').fill('a blog created by playwright3')
      await page.getByTestId('url').fill('www.playwright.com3')
      await page.getByRole('button', { name: 'create' }).click()
      await page.reload()
    })

    test.only('blog cannot be removed by user who did not add the blog', async ({ page }) => {
      await expect(await page.getByText('a blog created by playwright3')).toBeVisible()
    })
   
  })  
})