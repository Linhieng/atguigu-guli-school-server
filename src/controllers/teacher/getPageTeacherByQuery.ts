import { RequestHandler } from 'express'
import { EduTeacher } from '../../models/teacher'
import { formatDate } from '../../util/base'
import { checkRequired, checkSyntax, factoryR } from '../func'

type BodyProp = { // 前端传递的格式
  name?: string,
  level?: number, // 头衔
  begin?: Date,
  end?: Date,
}
type QueryProp = { // 后台(mongoose) 使用的格式
  level?: number,
  name?: string,
  gmt_create: {
    $gte: Date,
    $lte: Date,
  }
}
type Params = {
  current: number,
  limit: number,
}
type ResData = {
  rows: Array<IEduTeacher>,
  total: number,
}

const paramsProp = {
  current: 'number', // 当前页
  limit: 'number', // 每页记录数
}
const bodyProp = {
  name: 'string',
  level: 'number',
  begin: 'Date',
  end: 'Date',
}

function checkData (params: Record<string, unknown>, body: BodyProp) {
  try {
    checkRequired(params, paramsProp)
    checkSyntax(params, paramsProp)
    checkSyntax(body, bodyProp)
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

function getQuery (body: BodyProp): QueryProp {
  const query: QueryProp = {
    gmt_create: {
      $gte: new Date(0),
      $lte: new Date(),
    }
  }
  const begin = new Date(body.begin as any)
  const end = new Date(body.end as any)

  if ([1, 2].includes(body.level as any) == true) {
    query.level = body.level
  }
  if (typeof body.name === 'string' && body.name.trim() !== '') {
    query.name = body.name
  }
  if (!isNaN(begin.getTime())) {
    query.gmt_create.$gte = begin
  }
  if (!isNaN(end.getTime()) && begin < end) {
    query.gmt_create.$lte = end
  }

  return query
}

async function findData (params: Params, query: QueryProp): Promise<ResData> {
  const start = (params.current - 1) * params.limit
  const end = start + params.limit

  const accord = await EduTeacher
    .find({
      ...query,
      is_deleted: false,
    })
    .lean() as Array<IEduTeacher>
  const total = accord.length
  const rows = accord.slice(start, end)

  rows.forEach((doc, i) => {
    rows[i].gmt_create = formatDate(doc.gmt_create) as unknown as Date
  })

  return {
    rows,
    total,
  }
}

const getPageTeacherByQuery: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {
    const params = req.params as unknown as Params
    const body = req.body as unknown as BodyProp

    checkData(params, body)
    result.data = await findData(params, getQuery(body))

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'
  } catch (e) {
    console.error(e)
    if (e instanceof ReadError) {
      status = 200
      result.code = READ_ERROR
      result.message = e.message
      result.data = e.cause
    }/* else if (e instanceof CastError) { } */else {
      result.message = (e as Error).name + ': ' + (e as Error).message
    }
  }

  res
    .status(status)
    .json(result)
}
export default getPageTeacherByQuery