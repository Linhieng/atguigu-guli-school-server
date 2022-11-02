import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { catchError, checkRequired, checkSyntax, factoryR } from '../func'

type Teacher = {
  name: string,
  sort: number,
  level: number,
  career: string,
  intro: string,
  avatar: string,
}

const teacherProp = {
  name: 'string',
  sort: 'number',
  level: 'number',
  career: 'string',
  intro: 'string',
  avatar: 'string',
}

function checkTeacher (teacher: Record<string, unknown>) {
  try {
    checkRequired(teacher, teacherProp)
    checkSyntax(teacher, teacherProp)
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
    checkTeacher(req.body)
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