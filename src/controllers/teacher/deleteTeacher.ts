import { Types } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { handleRequest } from '../func'

type Params = { id: string }

const paramsProp = { id: 'ObjectId' }

async function del (id: string) {
  const result = await EduTeacher
    .findOneAndUpdate(
      { _id: new Types.ObjectId(id), is_deleted: false },
      { is_deleted: true, gmt_modified: new Date() }
    )
  return result
}

const deleteTeacher = handleRequest(async (req) => {
  const params = req.params as Params
  const delTeacher = await del(params.id)
  return { delTeacher }
}, {
  successMessage: '删除成功',
  checkParams: {
    syntaxProp: paramsProp
  }
})

export default deleteTeacher