import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { catchError, checkRequired, checkSyntax, factoryR, wrappingCheckError } from '../func'

type Params = { id: string }

const paramsProp = { id: 'string' }

const deleteTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const params = req.params as unknown as Params

    wrappingCheckError(params, paramsProp)
    await EduTeacher
      .findOneAndUpdate(
        { _id: new Types.ObjectId(params.id) },
        { is_deleted: true }
      )

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '删除成功'
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
export default deleteTeacher