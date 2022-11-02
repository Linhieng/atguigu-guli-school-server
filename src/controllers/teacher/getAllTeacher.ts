import { RequestHandler } from 'express'
import { EduTeacher } from '../../models/eduModel'
import { factoryR } from '../func'

const getAllTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const items = await EduTeacher.find({ is_deleted: false })

    result.data = { items }

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'
  } catch (e) {
    console.error(e)
    result.message = (e as Error).name + ': ' + (e as Error).message
  }

  res
    .status(status)
    .json(result)
}
export default getAllTeacher