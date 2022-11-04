import { EduTeacher } from '../../models/eduModel'
import { formatDate } from '../../util/base'
import { handleRequest } from '../func'

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
  const teacher: Teacher = {
    name: data.name,
    sort: data.sort,
    level: data.level,
    career: data.career,
    intro: data.intro,
    avatar: data.avatar,
  }
  return await EduTeacher.insertMany(teacher)
}

const addTeacher = handleRequest(async (req) => {
  const newTeacher = (await add(req.body))[0].toObject()

  newTeacher.gmt_create = formatDate(newTeacher.gmt_create) as unknown as Date
  (newTeacher as any).__v = undefined
  return { newTeacher }

}, {
  successMessage: '添加成功',
  checkBody: {
    syntaxProp: teacherProp
  }
})

export default addTeacher