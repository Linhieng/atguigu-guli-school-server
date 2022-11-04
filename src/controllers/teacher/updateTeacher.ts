import { RequestHandler } from 'express'
import { Types, Error, Schema } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { catchError, checkRequired, checkSyntax, factoryR, wrappingCheckError } from '../func'

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

async function update (body: Teacher) {
  const newData: Record<string, any> = {}
  canUpdate.forEach(item => {
    newData[item] = body[(item as keyof Teacher)]
  })
  newData.gmt_modified = new Date()
  await EduTeacher
    .findOneAndUpdate({
      _id: new Types.ObjectId(body.id),
      is_deleted: false,
    }, newData)
}

const updateTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const body = req.body as unknown as Teacher

    wrappingCheckError(body, teacherProp)
    await update(body)

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

export default updateTeacher