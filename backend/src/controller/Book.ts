import { book } from '@prisma/client'
import { Request, Response } from 'express'
import { prisma } from '../server'
import { genereateIsbn } from '../utils'

class Book {
  async listAll(req: Request, res: Response): Promise<Response> {
    try {
      const books = await prisma.book.findMany()
      return res.json(books).status(200)
    } catch (e) {
      return res.status(500)
    }
  }

  async insert(req: Request, res: Response): Promise<Response> {
    const isbn = genereateIsbn()
    try {
      const { name, author, copies, pages } = req.body as book

      if (!name) {
        return res.status(400).json({ error: "name não pode ser vazio ou nulo" })
      }

      if (name.length > 100) {
        return res.status(400).json({ error: "name não pode exceder 100 caracteres" })
      }

      if(!name[0].match(/^[a-zA-Z1-9]$/)) {
        return res.status(400).json({ error: "O primeiro caractere de name deve ser uma letra ou número." })
      }

      if (!author) {
        return res.status(400).json({ error: "author não pode ser vazio ou nulo" })
      }

      if (author.length > 100) {
        return res.status(400).json({ error: "name não pode exceder 100 caracteres" })
      }

      if(!author[0].match(/^[a-zA-Z]$/)) {
        return res.status(400).json({ error: "O primeiro caractere de author deve ser uma letra ou número." })
      }
      
      if(typeof pages != 'number' || pages == 0) {
        return res.status(400).json({ error: "pages deve ser um inteiro maior que zero." })
      }

      if(typeof pages == 'number' && copies > 2147483647 ) {
        return res.status(400).json({ error: "pages deve possuir um valor máximo de até 2147483647." })
      }

      if(typeof copies != 'number' || copies == 0) {
        return res.status(400).json({ error: "copies deve ser um inteiro maior que zero." })
      }

      if(typeof copies == 'number' && copies > 2147483647 ) {
        return res.status(400).json({ error: "copies deve possuir um valor máximo de até 2147483647." })
      }

      const newBook = await prisma.book.create({
        data: {
          isbn,
          name,
          author,
          copies,
          pages
        }
      })

      return res.status(201).json(newBook)
    } catch (error) {
      return res.status(500)
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { isbn } = req.params

      const book = await prisma.book.findFirst({
        where: {
          isbn
        }
      })

      if (!book) {
        return res.status(404).json({ error: "livro não encontrado" })
      }

      await prisma.book.delete({
        where: {
          isbn
        }
      })

      return res.status(204).json()
    } catch (e) {
      return res.status(500)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { isbn } = req.params
      const { name, author, copies, pages } = req.body

      await prisma.book.update({
        where: { isbn },
        data: {
          name,
          author,
          copies,
          pages
        }
      })

      return res.status(204).json()
    } catch (e) {
      return res.status(500)
    }
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    try {
      const { isbn } = req.params

      const book = await prisma.book.findFirst({
        where: {
          isbn
        }
      })

      if (!book) {
        return res.status(404).json({ error: "livro não encontrado" })
      }

      return res.status(200).json(book)
    } catch (e) {
      return res.status(500)
    }
  }
}

export default new Book()
