import { RequestHandler } from 'express'
import { EduSubject } from '../../models/eduModel'
import { factoryR } from '../func'

async function getList () {
  return await EduSubject.find({}).populate('children')
}

const getAllSubject: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    const list = await getList()

    result.data = { list }
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

export default getAllSubject