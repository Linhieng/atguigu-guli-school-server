import { RequestHandler } from "express"
import { Types } from "mongoose"
import { EduChapter, EduCourse } from "../../models/eduModel"
import { catchError, factoryR, wrappingCheckError } from "../func"

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
      return {}
  }

  return await EduChapter.findOne({ course_id: courseId })
}

const getChapterVideo: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    const params = req.params as Params
    wrappingCheckError(params, paramsProp)

    result.data = await get(new Types.ObjectId(params.id))
    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'

  } catch (e) {

    const { status: s, code, message, data } = catchError(e as Error)
    status = s
    result.success = false
    result.code = code
    result.message = message
    result.data = data

  }

  res
    .status(status)
    .json(result)
}

export default getChapterVideo