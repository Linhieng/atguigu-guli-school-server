import { RequestHandler } from 'express'
// import { EduTeacher } from '../../models/teacher'
import { factoryR } from '../func'

const getUserInfo: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    // result.data = await EduTeacher.find({})
    result.data = {
      roles: '[admin]',
      name: 'admin',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    }

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'
  } catch (e) {
    result.message = (e as Error).name + ': ' + (e as Error).message
  }

  res
    .status(status)
    .json(result)
}
export default getUserInfo