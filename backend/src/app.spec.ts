import { prisma, app } from './server'
import request from 'supertest'
import { book } from '@prisma/client'
import { generateString } from './utils'

beforeAll(async () => {
  await prisma.book.deleteMany()
})

beforeEach(async () => {
  await prisma.book.deleteMany()
  await prisma.$disconnect()
})

describe('GET /book', () => {
  it('should get a empty array of books', async () => {
    const { body, status } = await request(app).get('/book')

    expect(body).toStrictEqual([])
    expect(status).toBe(200)
  })

  it('ID 1 - Deve retornar uma lista de livros cadastrados', async () => {
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
    const numberOfBooks = body.length

    expect(numberOfBooks).toBeGreaterThan(0)
    expect(status).toBe(200)
  })

  it('ID 2 - Deve retornar detalhes de um único livro', async () => {
    await prisma.book.createMany({
      data: [{
        isbn: '1234',
        name: 'lorem ipsun',
        author: 'jhon doe',
        pages: 100,
        copies: 10
      }]
    })

    const { body, status } = await request(app).get('/book/1234')

    const { author, copies, isbn, name, pages } = body as book

    expect({ author, copies, isbn, name, pages }).toEqual(expect.objectContaining({ author, copies, isbn, name, pages }))
    expect(status).toBe(200)
  })

  it('ID 3 - Deve retornar mensagem dizendo "livro não encontrado" junto do com status code 404', async () => {
    const { body, status } = await request(app).get('/book/1234')

    expect(body).toEqual({ error: "livro não encontrado" })
    expect(status).toBe(404)
  })
})

describe("DELETE /book", () => {
  it('ID 1 - Deve remover um livro da lista de livros cadastrados', async () => {
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

    await request(app).delete('/book/1234')

    const { body, status } = await request(app).get('/book')

    expect(body.length).toBe(1)
    expect(status).toBe(200)
  })

  it('ID 2 - Deve retornar a mensagem: "livro não encontrado" ao tentar deletar um livro nao cadastrado, com retorno do status code de erro', async () => {

    const { body, status } = await request(app).delete('/book/4353')

    expect(body).toEqual({ error: "livro não encontrado" })
    expect(status).toBe(404)
  })
})

describe("POST /book", () => {
  it('ID 1 - Deve aparecer um novo livro cadastrado na lista de livros', async () => {
    const newBook =
    {
      isbn: '1234',
      name: 'newBook',
      author: 'newBook',
      pages: 100,
      copies: 10
    }

    await request(app).post('/book').send(newBook)

    const { body, status } = await request(app).get('/book')

    expect(body).toEqual(expect.arrayContaining([expect.objectContaining({
      name: 'newBook',
      author: 'newBook',
    })]));
    expect(status).toBe(200);
  })

  it('ID 2 - Deve mostrar a mensagem: "[campo] não pode ser vazio ou nulo"', async () => {
    const newBook =
    {
      isbn: '1234',
      name: '',
      author: 'xpto',
      pages: 0,
      copies: 0
    }

    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "name não pode ser vazio ou nulo"})
    expect(status).toBe(400);
  })

  it('ID 3 - Deve mostrar a mensagem: "[campo] não pode exceder 100 caracteres"', async () => {
    const newBook =
    {
      isbn: '1234',
      name: generateString(101),
      author: 'xpto',
      pages: 0,
      copies: 0
    }

    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "name não pode exceder 100 caracteres"})
    expect(status).toBe(400);
  })

  it('ID 4 - Deve mostrar a mensagem: "O primeiro caractere de `name` deve ser uma letra ou número."', async () => {
    const newBook =
    {
      isbn: '1234',
      name: '0jhon doe',
      author: 'xpto',
      pages: 0,
      copies: 0
    }
        
    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "O primeiro caractere de name deve ser uma letra ou número."})
    expect(status).toBe(400);
  })

  it('ID 5 - Deve mostrar a mensagem: "O primeiro caractere de `author` deve ser uma letra."', async () => {
    const newBook =
    {
      isbn: '1234',
      name: 'jhon doe',
      author: '1xpto',
      pages: 0,
      copies: 0
    }
        
    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "O primeiro caractere de author deve ser uma letra ou número."})
    expect(status).toBe(400);
  })

  it('ID 6 - Deve mostrar a mensagem: "[copies | pages] deve ser um inteiro."', async () => {
    const newBook =
    {
      isbn: '1234',
      name: 'jhon doe',
      author: 'xpto',
      pages: 100,
      copies: 'a'
    }
        
    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "copies deve ser um inteiro maior que zero."})
    expect(status).toBe(400);
  })

  it('ID 6 - Deve mostrar a mensagem: "[copies | pages] deve ser um inteiro."', async () => {
    const newBook =
    {
      isbn: '1234',
      name: 'jhon doe',
      author: 'xpto',
      pages: 100,
      copies: 'a'
    }
        
    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "copies deve ser um inteiro maior que zero."})
    expect(status).toBe(400);
  })

  it('ID 7 - Deve mostrar a mensagem: "[pages | copies] deve possuir um valor máximo de até 2147483647."', async () => {
    const newBook =
    {
      isbn: '1234',
      name: 'jhon doe',
      author: 'xpto',
      pages: 2147483648,
      copies: 2147483648
    }
        
    const { body, status } = await request(app).post('/book').send(newBook)

    expect(body).toEqual({error: "pages deve possuir um valor máximo de até 2147483647."})
    expect(status).toBe(400);
  })
})
