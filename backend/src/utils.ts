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

export function generateString(length: number) {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
