import { RequestHandler } from 'express'
import { Types, Error, Schema } from 'mongoose'
import { EduTeacher } from '../../models/teacher'
import { checkRequired, checkSyntax, factoryR } from '../func'

type Teacher = {
  id: string,
  name: string,
  sort: number,
  level: number,
  career: string,
  intro: string,
  avatar: string,
}

const teacherProp = {
  id: 'string',
  name: 'string',
  sort: 'number',
  level: 'number',
  career: 'string',
  intro: 'string',
  avatar: 'string',
}

const canUpdate = ['name', 'sort', 'level', 'career', 'intro', 'avatar']

function checkData (body: Teacher) {
  try {
    checkRequired(body, teacherProp)
    checkSyntax(body, teacherProp)
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

async function update (body: Teacher) {
  const newData: Record<string, any> = {}
  canUpdate.forEach(item => {
    newData[item] = body[(item as keyof Teacher)]
  })
  newData.gmt_modified = new Date()
  await EduTeacher
    .findOneAndUpdate({
      id: new Types.ObjectId(body.id),
      is_deleted: false,
    }, newData)
}

const updateTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const body = req.body as unknown as Teacher

    checkData(body)
    await update(body)

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '成功'
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

export default updateTeacher