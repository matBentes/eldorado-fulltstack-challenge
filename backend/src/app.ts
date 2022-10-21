import express from 'express'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

const PORT = process.env.NODE_PORT

const prisma = new PrismaClient()
dotenv.config()
const app = express()

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server')
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

app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
