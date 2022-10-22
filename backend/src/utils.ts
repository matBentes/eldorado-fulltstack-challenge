export function genereateIsbn (): string {
  const isbn = Math.floor(
    Math.random() * (9999999999999 - 1) + 1
  )

  return isbn.toString()
}

export function generateNumbers (): number {
  return Math.floor(
    Math.random() * (500 - 1) + 1
  )
}
