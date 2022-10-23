declare interface IEduChapter {
  id: string, // 章节ID; 主键
  course_id: string, // 课程ID; 外键 idx_course_id
  title: string, // 章节名称
  sort: number, // 显示排序
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}

declare interface IEduComment{
  id: string, // 讲师ID; 主键
  course_id: string, // 课程id; 外键 idx_course_id
  teacher_id: string, // 讲师id; 外键 idx_teacher_id
  member_id: string, // 会员id; 外键 idx_member_id
  nickname: string, // 会员昵称
  avatar: string, // 会员头像
  content: string, // 评论内容
  is_deleted: boolean, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}

declare interface IEduCourse{
  id: string, // 课程ID; 主键
  teacher_id: string, // 课程讲师ID; 外键 idx_subject_id
  subject_id: string, // 课程专业ID; 外键 idx_teacher_id
  subject_parent_id: string, // 课程专业父级ID
  title: string, // 课程标题; 外键 idx_title
  price: Decimal128/* {type: Number, default: 0.00} */, // ✨decimal(10,2) 课程销售价格，设置为 0 则可免费观看
  lesson_num: number, //  总课时
  cover: string, //  课程封面图片路径
  buy_count: number, //  销售数量
  view_count: number, //  浏览数量
  version: number, //  乐观锁
  status: string, //  课程状态 Draft未发布  Normal已发布
  is_deleted: boolean, //  逻辑删除
  gmt_create: Date, //  创建时间
  gmt_modified: Date, //  更新时间
}

declare interface IEduCourse_Collect{
  id: string, // 收藏ID; 主键
  course_id: string, // 课程讲师ID
  member_id: string, // 课程专业ID
  is_deleted: boolean, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}

declare interface IEduCourse_Description{
  id: string, // 课程ID; 主键
  description: string, // 课程简介
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}

declare interface IEduTeacher{
  id: string, // 讲师ID; 主键
  name: string, // 讲师姓名; 外键 uk_name
  intro: string, // 讲师简介
  career: string, // 一句话说明讲师
  level: number, // 头衔 1高级讲师 2首席讲师
  avatar: string, // 讲师头像
  sort: number, // 排序
  is_deleted: boolean, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}

declare interface IEduVideo{
  id: string, // 视频ID; 主键
  course_id: string, // 课程ID; 外键 idx_course_id
  chapter_id: string, // 章节ID; 外键 idx_chapter_id
  title: string, // 节点名称
  video_source_id: string, // 云端视频资源
  video_original_name: string, // 原始文件名称
  sort: number, // 排序字段
  play_count: number, // 播放次数
  is_free: boolean, // 是否可以试听
  duration: number, // 视频时长（秒）
  status: string, // Empty未上传 Transcoding转码中  Normal正常
  size: number, // 视频源文件大小（字节）
  version: number, // 乐观锁
  gmt_create: Date, // 创建时间
  gmt_modified: Date, // 更新时间
}
