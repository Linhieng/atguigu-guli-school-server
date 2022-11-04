import { EduTeacher } from '../../models/eduModel'
import { handleRequest } from '../func'

const getAllTeacher = handleRequest(async (req) => {
  const items = await EduTeacher.find({ is_deleted: false })
  return { items }
})
export default getAllTeacher