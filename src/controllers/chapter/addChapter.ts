
import { EduChapter } from "../../models/eduModel"
import { handleRequest, wrappingCheckError } from "../func"

type Chapter = {
  title: string,
  courseId: ObjectId,
  sort: number,
}
const chapterProp = {
  title: 'String',
  courseId: 'ObjectId',
  sort: 'number',
}

async function add (body: Chapter) {
  const c = await EduChapter.insertMany({
    title: body.title,
    course_id: body.courseId,
    sort: body.sort,
  })
  return c[0]._id
}


const addChapter = handleRequest(async (req) => {
  await add(req.body as Chapter)
}, {
  checkBody: {
    syntaxProp: chapterProp
  }
})

export default addChapter