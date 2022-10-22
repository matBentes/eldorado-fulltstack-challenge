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
    console.log(body)

    expect(body).toStrictEqual([])
    expect(status).toBe(200)
  })
})
