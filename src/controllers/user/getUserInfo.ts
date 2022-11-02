import { RequestHandler } from 'express'
import { catchError, factoryR } from '../func'

// TODO
const getUserInfo: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

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

    const { status: s, code, message, data } = catchError(e as Error)
    status = s
    result.success = false
    result.code = code
    result.message = message
    result.data = data

  }

  res
    .status(status)
    .json(result)
}
export default getUserInfo