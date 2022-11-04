import { Types } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { handleRequest } from '../func'

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
  id: 'ObjectId',
  name: 'String',
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
  return await EduTeacher
    .findOneAndUpdate({
      _id: new Types.ObjectId(body.id),
      is_deleted: false,
    }, newData)
}

const updateTeacher = handleRequest(async (req) => {
  const body = req.body as unknown as Teacher
  const newTeacher = await update(body)
  return { newTeacher }
}, {
  checkBody: {
    syntaxProp: teacherProp
  }
})

export default updateTeacher