import { Router } from 'express'
import getAllSubject from '../controllers/subject/getAllSubject'
import addSubject from '../controllers/subject/addSubject'
import { single } from './middleware/multer'

const router = Router()

router.get('/getAllSubject', getAllSubject)
router.post('/addSubject', single, addSubject)

export default router
