interface Edu {
  id: ObjectId
  gmt_create: Date
  gmt_modified: Date
}
declare interface IEduTeacher extends Edu {
  name: String
  intro: String
  career: String
  level: Number
  avatar: String
  sort: Number
  is_deleted: Boolean
}