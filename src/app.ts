import express from 'express'
import http from 'http'
import teacherRoutes from './routes/teacher'
import { json } from 'body-parser'

import init from './init/globalVas'
import globalError from './init/globalError'
import connectDB from './config/connect'

init()
connectDB()

const app = express()
const PORT = 8001

app.use(json())

app.use('/eduservice/teacher', teacherRoutes)

app.use(globalError)

http
  .createServer(app)
  .listen(PORT, () => {
    console.log(`listen http://localhost:${PORT} ...`)
  })