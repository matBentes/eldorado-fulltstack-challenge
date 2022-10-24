import { app } from './server'

const PORT = 3333 || process.env.NODE_PORT

app.listen(PORT, () => {
  console.log('🚀 Server ready at: http://localhost:3333')
})
