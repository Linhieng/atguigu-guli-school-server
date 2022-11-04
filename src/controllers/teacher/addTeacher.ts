import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { catchError, checkRequired, checkSyntax, factoryR, wrappingCheckError } from '../func'

type Teacher = {
  name: string,
  sort: number,
  level: number,
  career: string,
  intro: string,
  avatar: string,
}

const teacherProp = {
  name: 'String',
  sort: 'number',
  level: 'number',
  career: 'string',
  intro: 'string',
  avatar: 'string',
}

async function add (data: Teacher) {
  const teacher = {
    name: data.name,
    sort: data.sort,
    level: data.level,
    career: data.career,
    intro: data.intro,
    avatar: data.avatar,
    is_deleted: false,
  }
  const dTeacher = new EduTeacher(teacher)
  await dTeacher.save()
}

const addTeacher: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    wrappingCheckError(req.body, teacherProp)
    await add(req.body)

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '创建成功'
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

export default addTeacher