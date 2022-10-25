import { RequestHandler } from 'express'
import { Types, Error } from 'mongoose'
import { EduTeacher } from '../../models/teacher'
import { factoryR } from '../func'

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

function checkPropRequired (teacher: Record<string, unknown>) {
  Object.keys(teacherProp).forEach(prop => {
    if (Object.prototype.hasOwnProperty.call(teacher, prop) === false) {
      throw new PropertyRequiredError(prop)
    }
  })
}
function checkSyntax (teacher: Record<string, unknown>) {
  Object.keys(teacherProp).forEach((prop) => {
    if (typeof teacher[prop] !== teacherProp[(prop as keyof Teacher)]) {
      throw new PropertySyntaxError(prop)
    }
  })
}
function checkTeacher (body: Record<string, unknown>) {
  try {
    checkPropRequired(body)
    checkSyntax(body)
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
  const teacher: IEduTeacher = {
    id: new Types.ObjectId(),
    name: data.name,
    sort: data.sort,
    level: data.level,
    career: data.career,
    intro: data.intro,
    avatar: data.avatar === '' ? undefined : data.avatar,
    is_deleted: false,
    gmt_create: new Date(),
    gmt_modified: undefined,
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
    if (e instanceof ReadError) {
      status = 403
      result.message = e.message
      result.data = e.cause
    } else if (e instanceof Error.ValidationError) {
      status = 403
      result.message = e.name + ': ' + e.message
      result.data = e.errors
    } else {
      result.message = (e as Error).name + ': ' + (e as Error).message
    }
  }

  res
    .status(status)
    .json(result)
}
export default addTeacher