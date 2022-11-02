import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { checkRequired, checkSyntax, factoryR } from '../func'

type Params = { id: string }

const paramsProp = { id: 'string' }

function checkData (params: Record<string, unknown>) {
  try {
    checkRequired(params, paramsProp)
    checkSyntax(params, paramsProp)
  } catch (e) {
    if (e instanceof PropertyRequiredError) {
      throw new ReadError('缺少必要参数', {
        ...e,
        name: e.name,
        message: e.message,
      })
    } else if (e instanceof PropertySyntaxError) {
      throw new ReadError('参数格式错误', {
        ...e,
        name: e.name,
        message: e.message,
      })
    } else {
      throw e
    }
  }
}

const deleteTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const params = req.params as unknown as Params

    checkData(params)
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
    console.error(e)
    if (e instanceof ReadError) {
      status = 200
      result.code = READ_ERROR
      result.message = e.message
      result.data = e.cause
    } else if (e instanceof Error.CastError) {
      status = 200
      result.code = M_CAST_ERROR
      result.message = e.message
      result.data = {
        name: e.name,
        stringValue: e.stringValue,
        kind: e.kind,
        value: e.value,
        path: e.path,
      }
    } else {
      result.message = (e as Error).name + ': ' + (e as Error).message
    }
  }

  res
    .status(status)
    .json(result)
}
export default deleteTeacher