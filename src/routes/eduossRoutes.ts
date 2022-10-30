import { Router } from 'express'
import fileoss from '../controllers/eduoss/fileoss'
import { single } from './middleware/multer'

const router = Router()

router.post('/fileoss', single, fileoss)

export default router