import { Router } from 'express'
import addTeacher from '../controllers/teacher/addTeacher'
import getAllTeacher from '../controllers/teacher/getAllTeacher'

const router = Router()

router.get('/findAll', getAllTeacher)
// router.get('/pageTeacher/:current/:limit', page)
// router.get('/getTeacher/:id', get)
// router.post('/pageTeacherCondition/:current/:limit', pageWithCondition)
router.post('/addTeacher', addTeacher)
// router.post('/updateTeacher', update)
// router.delete('/:id', del)

export default router