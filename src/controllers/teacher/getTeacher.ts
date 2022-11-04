import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { catchError, checkRequired, checkSyntax, factoryR, wrappingCheckError } from '../func'

type Params = { id: string }

const paramsProp = { id: 'string' }

const getTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const params = req.params as unknown as Params

    wrappingCheckError(params, paramsProp)

    const teacher = await EduTeacher
      .findOne({
        _id: new Types.ObjectId(params.id),
        is_deleted: false,
      })
    result.data = { teacher }

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '成功'
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
export default getTeacher