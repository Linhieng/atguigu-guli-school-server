import { Router } from 'express'
import addTeacher from '../controllers/teacher/addTeacher'
import deleteTeacher from '../controllers/teacher/deleteTeacher'
import getAllTeacher from '../controllers/teacher/getAllTeacher'
import getPageTeacherByQuery from '../controllers/teacher/getPageTeacherByQuery'
import getTeacher from '../controllers/teacher/getTeacher'
import updateTeacher from '../controllers/teacher/updateTeacher'

const router = Router()

router.get('/findAll', getAllTeacher)
// router.get('/pageTeacher/:current/:limit', page)
router.get('/getTeacher/', getTeacher)
router.get('/getTeacher/:id', getTeacher)
router.post('/pageTeacherCondition', getPageTeacherByQuery)
router.post('/pageTeacherCondition/:current', getPageTeacherByQuery)
router.post('/pageTeacherCondition/:current/:limit', getPageTeacherByQuery)
router.post('/addTeacher', addTeacher)
router.post('/updateTeacher', updateTeacher)
router.delete('/', deleteTeacher)
router.delete('/:id', deleteTeacher)

export default router