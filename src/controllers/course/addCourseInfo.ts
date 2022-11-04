import { Types } from "mongoose"
import { EduCourse } from "../../models/eduModel"
import { handleRequest } from "../func"

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
  teacherId: 'ObjectId',
  subjectId: 'ObjectId',
  subjectParentId: 'ObjectId',
  title: 'String',
  price: 'number',
  lessonNum: 'number',
  cover: 'string',
}

async function add (body: Course) {
  const c = await EduCourse.insertMany({
    teacher_id: new Types.ObjectId(body.teacherId),
    subject_id: new Types.ObjectId(body.subjectId),
    subject_parent_id: new Types.ObjectId(body.subjectParentId),
    title: body.title,
    price: body.price,
    lesson_num: body.lessonNum,
    cover: body.cover,
  })
  return c[0]._id
}

const addCourseInfo = handleRequest(async (req) => {
  const courseId = await add(req.body)
  return { courseId }
}, {
  checkBody: {
    syntaxProp: courseProp
  }
})

export default addCourseInfo