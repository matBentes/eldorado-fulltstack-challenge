import { prisma, app } from './server'
import { describe, afterAll, expect, it, beforeAll } from 'vitest'
import request from 'supertest'

beforeAll(async () => {
  await prisma.book.deleteMany()
})

afterAll(async () => {
  await prisma.book.deleteMany()
  await prisma.$disconnect()
})

describe('GET /book', () => {
  it('should get a empty array of books', async () => {
    const { body, status } = await request(app).get('/book')

    expect(body).toStrictEqual([])
    expect(status).toBe(200)
  })

  it('should return many books', async () => {
    await prisma.book.createMany({
      data: [{
        isbn: '1234',
        name: 'lorem ipsun',
        author: 'jhon doe',
        pages: 100,
        copies: 10
      },
      {
        isbn: '456',
        name: 'title of a book',
        author: 'xpto',
        pages: 200,
        copies: 20
      }]
    })

    const { body, status } = await request(app).get('/book')

    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({ isbn: '456', author: 'xpto' }),
      expect.objectContaining({ isbn: '1234', author: 'jhon doe' })
    ]))
    expect(status).toBe(200)
  })
})
