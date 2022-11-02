import { Schema, SchemaDefinition, SchemaDefinitionType } from 'mongoose'

const DEFAULT_IMG_SRC = 'https://linhieng.oss-cn-shenzhen.aliyuncs.com/p.jpg'
/* 所有集合均有 gmt_create, gmt_modified 和 id 字段, id 字段是 _id 的别名, 并且可供输出 */
export function createMySchema (schema: SchemaDefinition<SchemaDefinitionType<any>>) {
  const newSchema = new Schema({
    ...schema,
    gmt_create: { type: Date, default: new Date() },
    gmt_modified: { type: Date, default: null },
  }, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true }
  })
  newSchema.virtual('id').get(function () {
    return this._id
  })
  return newSchema
}

export const eduTeacherSchema = createMySchema({
  name: { type: String, required: true, /* unique: true */ }, // 讲师姓名;
  intro: { type: String, default: '' }, // 讲师简介
  career: { type: String, default: '' }, // 一句话说明讲师
  level: { type: Number, default: 1 }, // 头衔 1高级讲师 2首席讲师
  avatar: { type: String, default: '' }, // 讲师头像
  sort: { type: Number, default: 0 }, // 排序
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
})

export const eduSubjectChildrenSchema = createMySchema({
  title: { type: String, required: true }, // 子专业名称
  parent_id: { type: Schema.Types.ObjectId, ref: 'edu_subjects', required: true },  // 父专业ID
  sort: { type: Number, default: 0 }, // 排序字段
})

export const eduSubjectSchema = createMySchema({
  title: { type: String, required: true }, // 父专业名称
  children: [{ type: Schema.Types.ObjectId, ref: 'edu_subject_children' }],  // 父专业包含的子专业ID
  sort: { type: Number, default: 0 }, // 排序字段
})

export const eduCoursesSchema = createMySchema({
  teacher_id: { type: Schema.Types.ObjectId, ref: 'edu_teachers', required: true }, // 课程讲师ID
  subject_id: { type: Schema.Types.ObjectId, ref: 'edu_subject_children', required: true }, // 课程子专业ID
  subject_parent_id: { type: Schema.Types.ObjectId, ref: 'edu_subjects', required: true }, // 课程专业父级ID; 外键
  title: { type: String, required: true }, // 课程标题;
  price: { type: Number, default: 0 }, //  课程销售价格, 设置为 0 则可免费观看; ✨decimal(10,2), 存储时需要手动限制小数位数为两位
  lesson_num: { type: Number, required: true }, //  总课时
  cover: { type: String, default: DEFAULT_IMG_SRC }, //  课程封面图片路径
  buy_count: { type: Number, default: 0 }, //  销售数量
  view_count: { type: Number, default: 0 }, //  浏览数量
  version: { type: Number, default: 1 }, //  乐观锁
  status: { type: String, default: 'Draft', enum: ['Draft', 'Normal'] }, //  课程状态 Draft未发布  Normal已发布
  is_deleted: { type: Boolean, default: false }, //  逻辑删除
})

export const eduCourseCollectsSchema = createMySchema({
  course_id: { type: Schema.Types.ObjectId, ref: 'edu_teachers', required: true }, // 课程讲师ID
  member_id: { type: Schema.Types.ObjectId, ref: 'edu_subject_children', required: true }, // 课程子专业ID
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
})

export const eduCourseDescriptionsSchema = createMySchema({
  description: { type: String, default: '' }, // 课程简介
})

export const eduChaptersSchema = createMySchema({
  title: { type: String, required: true }, // 章节名称
  course_id: { type: Schema.Types.ObjectId, ref: 'edu_subject_children', required: true }, // 课程ID
  sort: { type: Number, default: 0 }, // 显示排序
})

export const eduVideosSchema = createMySchema({
  title: { type: String, required: true }, // 节点名称
  course_id: { type: Schema.Types.ObjectId, ref: 'edu_subject_children', required: true }, // 课程ID
  chapter_id: { type: Schema.Types.ObjectId, ref: 'edu_chapters', required: true }, // 章节ID
  video_source_id: { type: String, default: '' }, // 云端视频资源
  video_original_name: { type: String, default: '' }, // 原始文件名称
  sort: { type: Number, default: 0 }, // 排序字段
  play_count: { type: Number, default: 0 }, // 播放次数
  is_free: { type: Boolean, default: false }, // 是否可以试听
  duration: { type: Number, required: true }, // 视频时长（秒）
  status: { type: String, default: 'Empty', enum: ['Empty', 'Transcoding', 'Normal'] }, // Empty未上传 Transcoding转码中  Normal正常
  size: { type: Number, required: true }, // 视频源文件大小（字节）
  version: { type: Number, default: 1 }, // 乐观锁
})

export const eduCommentsSchema = createMySchema({
  course_id: { type: Schema.Types.ObjectId, ref: 'edu_subject_children', required: true }, // 课程ID
  teacher_id: { type: Schema.Types.ObjectId, ref: 'edu_teachers', required: true }, // 讲师ID
  member_id: { type: Schema.Types.ObjectId, ref: 'acl_users', required: true }, // 会员ID
  nickname: { type: String, required: true }, // 会员昵称
  avatar: { type: String, required: true }, // 会员头像
  content: { type: String, required: true }, // 评论内容
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
})