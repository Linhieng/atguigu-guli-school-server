import { Schema, model } from 'mongoose'

export const EduTeacher = model('edu_teachers', new Schema({
  id: { type: Schema.Types.ObjectId, required: true }, // 讲师ID; 主键
  name: { type: String, required: true }, // 讲师姓名; 外键 uk_name
  intro: { type: String, required: true }, // 讲师简介
  career: { type: String, required: true }, // 一句话说明讲师
  level: { type: Number, required: true }, // 头衔 1高级讲师 2首席讲师
  avatar: { type: String, required: false, default: 'https://pic1.imgdb.cn/item/6289832b0947543129a9afcc.png' }, // 讲师头像
  sort: { type: Number, required: true }, // 排序
  is_deleted: { type: Boolean, required: true }, // 逻辑删除
  gmt_create: { type: Date, required: true }, // 创建时间
  gmt_modified: { type: Date, required: false }, // 更新时间
}))

/// * ************************************************************** * \\
// * ************************************************************** * \\
// * ************************************************************** * \\
// * ************************************************************** * \\
// * ************************** 分割线 ***************************** * \\
// * ************************************************************** * \\
// * ************************************************************** * \\
// * ************************************************************** * \\
// * ************************************************************** * \\
/*
const edu_chapter = new Schema({
  id: String, // 章节ID; 主键
  course_id: String, // 课程ID; 外键 idx_course_id
  title: String, // 章节名称
  sort: { type: Number, default: 0 }, // 显示排序
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

const edu_comment = new Schema({
  id: String, // 讲师ID; 主键
  course_id: { type: String, default: '' }, // 课程id; 外键 idx_course_id
  teacher_id: { type: String, default: '' }, // 讲师id; 外键 idx_teacher_id
  member_id: { type: String, default: '' }, // 会员id; 外键 idx_member_id
  nickname: String, // 会员昵称
  avatar: String, // 会员头像
  content: String, // 评论内容
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

const edu_course = new Schema({
  id: String, // 课程ID; 主键
  teacher_id: String, // 课程讲师ID; 外键 idx_subject_id
  subject_id: String, // 课程专业ID; 外键 idx_teacher_id
  subject_parent_id: String, // 课程专业父级ID
  title: String, // 课程标题; 外键 idx_title
  price: Decimal128/* {type: Number, default: 0.00} \*\/, // ✨decimal(10,2) 课程销售价格，设置为 0 则可免费观看
  lesson_num: { type: Number, default: 0 }, //  总课时
  cover: String, //  课程封面图片路径
  buy_count: { type: Number, default: 0 }, //  销售数量
  view_count: { type: Number, default: 0 }, //  浏览数量
  version: { type: Number, default: 1 }, //  乐观锁
  status: { type: String, default: 'Draft' }, //  课程状态 Draft未发布  Normal已发布
  is_deleted: { type: Boolean, default: false }, //  逻辑删除
  gmt_create: Date, //  创建时间
  gmt_modified: Date, //  更新时间
})

const edu_course_collect = new Schema({
  id: String, // 收藏ID; 主键
  course_id: String, // 课程讲师ID
  member_id: { type: String, default: '' }, // 课程专业ID
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

const edu_course_description = new Schema({
  id: String, // 课程ID; 主键
  description: String, // 课程简介
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

const edu_teacher = new Schema({
  id: String, // 讲师ID; 主键
  name: String, // 讲师姓名; 外键 uk_name
  intro: { type: String, default: '' }, // 讲师简介
  career: String, // 一句话说明讲师
  level: Number, // 头衔 1高级讲师 2首席讲师
  avatar: String, // 讲师头像
  sort: { type: Number, default: 0 }, // 排序
  is_deleted: { type: Boolean, default: false }, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

const edu_video = new Schema({
  id: String, // 视频ID; 主键
  course_id: String, // 课程ID; 外键 idx_course_id
  chapter_id: String, // 章节ID; 外键 idx_chapter_id
  title: String, // 节点名称
  video_source_id: String, // 云端视频资源
  video_original_name: String, // 原始文件名称
  sort: { type: Number, default: 0 }, // 排序字段
  play_count: { type: Number, default: 0 }, // 播放次数
  is_free: { type: Boolean, default: false }, // 是否可以试听
  duration: { type: Number, default: 0 }, // 视频时长（秒）
  status: { type: String, default: 'Empty' }, // Empty未上传 Transcoding转码中  Normal正常
  size: { type: Number, default: 0 }, // 视频源文件大小（字节）
  version: { type: Number, default: 1 }, // 乐观锁
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
})

*/