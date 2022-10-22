import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import express, { Router } from 'express'
import Book from './controller/Book'

export const prisma = new PrismaClient()
dotenv.config()

export const app = express()

export const routes = Router()

app.get('/', (req, res) => {
  res.send('Express + TypeScript a')
})

app.get('/book', Book.listAll)

app.post('/book', Book.insert)

app.delete('/book/:isbn', async (req, res) => {
  const { isbn } = req.params

  await prisma.book.delete({
    where: {
      isbn
    }
  })

  // TODO return the correct status code
})

app.put('/book/:isbn', Book.update)
