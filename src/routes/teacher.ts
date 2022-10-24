import { Router } from 'express'
// @ts-ignore: 暂时忽略
import { getAll, page, get, pageWithCondition, add, update, del } from '../controllers/teacher'

const router = Router()

router.get('/findAll', getAll)
// router.get('/pageTeacher/:current/:limit', page)
// router.get('/getTeacher/:id', get)
// router.post('/pageTeacherCondition/:current/:limit', pageWithCondition)
// router.post('/addTeacher', add)
// router.post('/updateTeacher', update)
// router.delete('/:id', del)

export default router