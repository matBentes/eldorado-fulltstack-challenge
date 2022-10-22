import { json } from 'express'
import { app, routes } from './server'

const PORT = process.env.NODE_PORT

app.use(json())

app.use(routes)

app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
