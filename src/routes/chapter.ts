import { Router } from 'express'
import addChapter from '../controllers/chapter/addChapter'
import getChapterVideo from '../controllers/chapter/getChapterVideo'

const router = Router()

router.get('/getChapterVideo/', getChapterVideo)
router.get('/getChapterVideo/:id', getChapterVideo)
router.post('/addChapter', addChapter)

export default router