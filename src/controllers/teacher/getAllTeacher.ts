import { RequestHandler } from 'express'
import { EduTeacher } from '../../models/teacher'
import { factoryR } from '../func'

const getAllTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    result.data = await EduTeacher.find({})

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'
  } catch (e) {
    // TODO: find 可能会抛出异常
    result.message = (e as Error).name + ': ' + (e as Error).message
  }

  res
    .status(status)
    .json(result)
}
export default getAllTeacher