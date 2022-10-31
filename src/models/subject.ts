import { Schema, model } from 'mongoose'

export const subjectChildren = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  sort: { type: Number, default: 0 }, // 排序字段
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})
export const EduSubject = model('edu_subjects', new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  children: { type: [subjectChildren], required: false },
  sort: { type: Number, default: 0 }, // 排序字段
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}))