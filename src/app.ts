import express, { Request, Response, NextFunction } from 'express'
import http from 'http'
import todoRoutes from '@/routes/todo'
import { json } from 'body-parser'

const app = express()
const PORT = 8080

app.use(json())
app.use('/todos', todoRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next()
  }
  res
    .status(500)
    .json({ message: err.message })
})

http
  .createServer(app)
  .listen(PORT, () => {
    console.log(`listen http://localhost:${PORT} ...`)
  })