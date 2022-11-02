import { RequestHandler } from "express"
import { Types } from "mongoose"
import { EduCourse } from "../../models/eduModel"
import { catchError, checkRequired, checkSyntax, factoryR, wrappingCheckError } from "../func"

type Course = {
  teacherId: ObjectId,
  subjectId: ObjectId,
  subjectParentId: ObjectId,
  title: String,
  price: Number,
  lessonNum: Number,
  cover: String,
}
const courseProp = {
  teacherId: 'string',
  subjectId: 'string',
  subjectParentId: 'string',
  title: 'string',
  price: 'number',
  lessonNum: 'number',
  cover: 'string',
}

async function add (body: Course) {
  await EduCourse.insertMany({
    teacher_id: new Types.ObjectId(body.teacherId),
    subject_id: new Types.ObjectId(body.subjectId),
    subject_parent_id: new Types.ObjectId(body.subjectParentId),
    title: body.title,
    price: body.price,
    lesson_num: body.lessonNum,
    cover: body.cover,
  })
}

const addCourseInfo: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    wrappingCheckError(req.body, courseProp)
    await add(req.body)

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

export default addCourseInfo