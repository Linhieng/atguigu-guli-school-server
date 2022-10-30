import { Router } from 'express'
import userLogin from '../controllers/user/userLogin'
import getUserInfo from '../controllers/user/getUserInfo'
import userLoginOut from '../controllers/user/userLoginOut'

const router = Router()

router.post('/login', userLogin)
router.get('/info', getUserInfo)
router.post('/logout', userLoginOut)

export default router