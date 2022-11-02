import { Router } from 'express'
import addCourseInfo from '../controllers/course/addCourseInfo'

const router = Router()

router.post('/addCourseInfo', addCourseInfo)

export default router