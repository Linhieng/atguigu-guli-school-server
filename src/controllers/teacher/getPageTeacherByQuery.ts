import { EduTeacher } from '../../models/eduModel'
import { formatDate } from '../../util/base'
import { handleRequest } from '../func'

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
  rows: Array<{}>,
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

// NOTE: 不是模糊搜索
async function findData (params: Params, query: QueryProp): Promise<ResData> {
  const start = (params.current - 1) * params.limit
  const end = start + params.limit

  const docs = await EduTeacher.find({
    ...query,
    is_deleted: false,
  })
  const accord = docs.reduce((pre: Array<IEduTeacher>, doc) => ([...pre, doc.toObject() as IEduTeacher]), [])
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

const getPageTeacherByQuery = handleRequest(async (req) => {
  const params = req.params as unknown as Params
  const body = req.body as unknown as BodyProp
  return await findData(params, getQuery(body))
}, {
  checkBody: {
    syntaxProp: bodyProp,
    requiredProp: {},
  },
  checkParams: {
    syntaxProp: paramsProp
  }
})
export default getPageTeacherByQuery