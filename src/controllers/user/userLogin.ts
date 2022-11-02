import { RequestHandler } from 'express'
import { catchError, factoryR } from '../func'

// TODO
const userLogin: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    result.data = {
      token: 'user-token',
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
export default userLogin