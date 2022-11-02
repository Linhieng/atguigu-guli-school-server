import { RequestHandler } from 'express'
import { factoryR } from '../func'

// TODO
const userLoginOut: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    status = 200
    result.data = {}
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
export default userLoginOut