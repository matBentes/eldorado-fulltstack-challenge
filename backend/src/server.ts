import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import express, { Router } from 'express'

export const prisma = new PrismaClient()
dotenv.config()

export const app = express()

export const routes = Router()

app.get('/', (req, res) => {
  res.send('Express + TypeScript a')
})

app.get('/book', async (req, res) => {
  const books = await prisma.book.findMany()
  return res.json(books).status(200)
})

app.post('/book', async (req, res) => {
  const {
    isbn,
    name,
    author,
    copies,
    pages
  } = req.body

  await prisma.book.create({
    data: {
      isbn,
      name,
      author,
      copies,
      pages
    }
  })

  // TODO return the correct status code
})

app.delete('/book/:isbn', async (req, res) => {
  const { isbn } = req.params

  await prisma.book.delete({
    where: {
      isbn
    }
  })

  // TODO return the correct status code
})

app.put('/book/:isbn', async (req, res) => {
  const { isbn } = req.params
  const { author } = req.body

  await prisma.book.update({
    where: { isbn },
    data: { author }
  })
  // TODO return the correct status code
})
