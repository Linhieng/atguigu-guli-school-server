import { Types } from "mongoose"
import { EduChapter } from "../../models/eduModel"
import { handleRequest } from "../func"

type Params = {
  id: string,
}
const paramsProp = {
  id: 'ObjectId'
}

async function get (courseId: ObjectId) {
  /*
  判断章节中是否存在课程ID
    存在 --> 返回数据
    不存在 --> 返回空
  */
  const isExist = await EduChapter.exists({ course_id: courseId })

  if (!isExist) {
    return []
  }

  return await EduChapter.find({ course_id: courseId })
}

const getChapterVideo = handleRequest(async (req) => {
  const params = req.params as Params
  const allChapterVideo = await get(new Types.ObjectId(params.id))

  return { allChapterVideo }

}, {
  checkParams: {
    syntaxProp: paramsProp
  }
})

export default getChapterVideo