import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import express, { json } from 'express'
import Book from './controller/Book'
import cors from 'cors'

export const prisma = new PrismaClient()
dotenv.config()

export const app = express()

app.use(json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express + TypeScript a')
})

app.get('/book', Book.listAll)

app.post('/book', Book.insert)

app.delete('/book/:isbn', Book.delete)

app.patch('/book/:isbn', Book.update)
