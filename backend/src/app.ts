import { json } from 'express'
import { app } from './server'

const PORT = process.env.NODE_PORT

app.use(json())

app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
