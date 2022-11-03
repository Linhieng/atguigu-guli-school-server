import { Router } from 'express'
import getChapterVideo from '../controllers/chapter/getChapterVideo'

const router = Router()

router.get('/getChapterVideo/', getChapterVideo)
router.get('/getChapterVideo/:id', getChapterVideo)

export default router