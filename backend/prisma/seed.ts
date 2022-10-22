import { PrismaClient, Prisma } from '@prisma/client'
import { genereateIsbn } from '../src/utils'

const prisma = new PrismaClient()

const userData: Prisma.bookUncheckedCreateInput[] = [
  {
    isbn: genereateIsbn(),
    name: 'lorem ipsun',
    author: 'jhon doe',
    pages: 100,
    copies: 10
  },
  {
    isbn: genereateIsbn(),
    name: 'title of a book',
    author: 'xpto',
    pages: 200,
    copies: 20
  },
  {
    isbn: genereateIsbn(),
    name: 'second title of a book',
    author: 'jk',
    pages: 300,
    copies: 30
  }
]

async function main (): Promise<void> {
  console.log('Start seeding ...')
  for (const u of userData) {
    const book = await prisma.book.create({
      data: u
    })
    console.log(`Created book with id: ${book.isbn}`)
  }
  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
