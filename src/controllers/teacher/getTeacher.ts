import { Types } from 'mongoose'
import { EduTeacher } from '../../models/eduModel'
import { handleRequest } from '../func'

type Params = { id: string }

const paramsProp = { id: 'ObjectId' }

function get (id: string) {
  return EduTeacher
    .findOne({
      _id: new Types.ObjectId(id),
      is_deleted: false,
    })
}

const getTeacher = handleRequest(async (req) => {
  const params = req.params as unknown as Params
  const teacher = await get(params.id)
  return { teacher }
}, {
  checkParams: {
    syntaxProp: paramsProp
  }
})
export default getTeacher