import express from 'express'
import http from 'http'
import teacherRoutes from './routes/teacher'
import userRoutes from './routes/user'
import subjectRoutes from './routes/subject'
import courseRoutes from './routes/course'
import { json } from 'body-parser'
import cors from 'cors'

import connectDB from './config/connect'
import initErrorObj from './init/errorObj'
import initGlobalVas from './init/globalVas'
import globalError from './middleware/globalError'
import initLog from './init/initLog'
import eduossRoutes from './routes/eduossRoutes'

const app = express()
const PORT = 8001

initLog(app)
connectDB()
initGlobalVas()
initErrorObj()

app.use(json())
app.use(cors())

app.use('/eduservice/user', userRoutes)
app.use('/eduservice/teacher', teacherRoutes)
app.use('/eduservice/subject', subjectRoutes)
app.use('/eduservice/course', courseRoutes)
app.use('/eduoss', eduossRoutes)

app.use(globalError)

http
  .createServer(app)
  .listen(PORT, () => {
    console.log(`listen http://localhost:${PORT} ...`)
  })