import { EduSubject } from '../../models/eduModel'
import { handleRequest } from '../func'

async function getList () {
  return await EduSubject.find({}).populate('children')
}

const getAllSubject = handleRequest(async (req) => {
  const list = await getList()
  return { list }
})

export default getAllSubject