import { Router } from 'express'
import addTeacher from '../controllers/teacher/addTeacher'
import getAllTeacher from '../controllers/teacher/getAllTeacher'
import getPageTeacherByQuery from '../controllers/teacher/getPageTeacherByQuery'

const router = Router()

router.get('/findAll', getAllTeacher)
// router.get('/pageTeacher/:current/:limit', page)
// router.get('/getTeacher/:id', get)
router.post('/pageTeacherCondition', getPageTeacherByQuery)
router.post('/pageTeacherCondition/:current', getPageTeacherByQuery)
router.post('/pageTeacherCondition/:current/:limit', getPageTeacherByQuery)
router.post('/addTeacher', addTeacher)
// router.post('/updateTeacher', update)
// router.delete('/:id', del)

export default router