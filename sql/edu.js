// import mongoose, { connect, model, Schema } from 'mongoose'
const mongoose = require('mongoose')
const { connect, model, Schema, Types } = mongoose

async function main () {
  const db = await connect('mongodb://localhost:27017/guli')

  const edu_chapters = new Schema({
    id: Schema.Types.ObjectId, // 章节ID; 主键
    course_id: String, // 课程ID; 外键 idx_course_id
    title: String, // 章节名称
    sort: { type: Number, default: 0 }, // 显示排序
    gmt_create: Date, // 创建时间
    gmt_modified: Date, // 更新时间
  })
  const edu_comments = new Schema({
    id: Schema.Types.ObjectId, // 讲师ID; 主键
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
  const edu_courses = new Schema({
    id: Schema.Types.ObjectId, // 课程ID; 主键
    teacher_id: String, // 课程讲师ID; 外键 idx_subject_id
    subject_id: String, // 课程专业ID; 外键 idx_teacher_id
    subject_parent_id: String, // 课程专业父级ID
    title: String, // 课程标题; 外键 idx_title
    price: mongoose.Decimal128/* {type: Number, default: 0.00} */, // ✨decimal(10,2) 课程销售价格，设置为 0 则可免费观看
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
  const edu_course_collects = new Schema({
    id: Schema.Types.ObjectId, // 收藏ID; 主键
    course_id: String, // 课程讲师ID
    member_id: { type: String, default: '' }, // 课程专业ID
    is_deleted: { type: Boolean, default: false }, // 逻辑删除
    gmt_create: Date, // 创建时间
    gmt_modified: Date, // 更新时间
  })
  const edu_course_descriptions = new Schema({
    id: Schema.Types.ObjectId, // 课程ID; 主键
    description: String, // 课程简介
    gmt_create: Date, // 创建时间
    gmt_modified: Date, // 更新时间
  })
  const edu_subjects = new Schema({
    id: Schema.Types.ObjectId, // 课程类别ID; 主键
    title: String, // 类别名称
    parent_id: { type: String, default: '0' }, // 父ID; 外键 idx_parent_id
    sort: { type: Number, default: 0 }, // 排序字段
    gmt_create: Date, // 创建时间
    gmt_modified: Date, // 更新时间
  })
  const edu_teachers = new Schema({
    id: Schema.Types.ObjectId, // 讲师ID; 主键
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
  const edu_videos = new Schema({
    id: Schema.Types.ObjectId, // 视频ID; 主键
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

  const Chapter = model('edu_chapters', edu_chapters)
  const Comment = model('edu_comments', edu_comments)
  const Course = model('edu_courses', edu_courses)
  const Course_collect = model('edu_course_collects', edu_course_collects)
  const Course_description = model('edu_course_descriptions', edu_course_descriptions)
  const Subjects = model('edu_subjects', edu_subjects)
  const Teacher = model('edu_teachers', edu_teachers)
  const Video = model('edu_videos', edu_videos)

  await Chapter.insertMany([
    {
     id: new Types.ObjectId(),
      course_id: '14',
      title: '第一章：HTML',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-01-01 12:55:30'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      title: '第一章节',
      sort: 0,
      gmt_create: '2019-11-07 09:28:25',
      gmt_modified: '2019-11-07 09:28:25',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第一章：Java入门',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-10-09 09:13:19',
    }, {
     id: new Types.ObjectId(),
      course_id: '14',
      title: '第二章：CSS',
      sort: 0,
      gmt_create: '2019-01-01 12:55:35',
      gmt_modified: '2019-01-01 12:27:40',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第二章：控制台输入和输出',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-01-01 12:27:40',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第三章：控制流',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-01-01 12:27:40',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第四章：类的定义',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-01-01 12:27:40',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第五章：数组',
      sort: 0,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-01-01 12:27:40',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第六章：继承',
      sort: 61,
      gmt_create: '2019-01-01 12:27:40',
      gmt_modified: '2019-10-09 08:32:47',
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      title: '第七章：I/O流',
      sort: 70,
      gmt_create: '2019-10-09 08:32:58',
      gmt_modified: '2019-10-09 08:33:20',
    },
  ])
  await Comment.insertMany([
    {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三123',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '课程很好',
      is_deleted: 0,
      gmt_create: '2019-11-13 14:16:08',
      gmt_modified: '2019-11-13 14:16:08'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三123',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '11',
      is_deleted: 0,
      gmt_create: '2019-11-14 16:42:35',
      gmt_modified: '2019-11-14 16:42:35'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三123',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '111',
      is_deleted: 0,
      gmt_create: '2019-11-14 16:42:53',
      gmt_modified: '2019-11-14 16:42:53'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: null,
      avatar: null,
      content: '2233',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:03:45',
      gmt_modified: '2019-11-15 16:03:45'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: null,
      avatar: null,
      content: '4455',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:05:11',
      gmt_modified: '2019-11-15 16:05:11'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三1231',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '55',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:10:53',
      gmt_modified: '2019-11-15 16:10:53'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三1231',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '55',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:11:13',
      gmt_modified: '2019-11-15 16:11:13'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三1231',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '223344',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:11:18',
      gmt_modified: '2019-11-15 16:11:18'
    }, {
     id: new Types.ObjectId(),
      course_id: '14',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三1231',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '11',
      is_deleted: 0,
      gmt_create: '2019-11-15 16:47:53',
      gmt_modified: '2019-11-15 16:47:53'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      teacher_id: '1189389726308478977',
      member_id: '1',
      nickname: '小三1231',
      avatar: 'http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoj0hHXhgJNOTSOFsS4uZs8x1ConecaVOB8eIl115xmJZcT4oCicvia7wMEufibKtTLqiaJeanU2Lpg3w/132',
      content: '666666',
      is_deleted: 0,
      gmt_create: '2019-11-18 11:10:58',
      gmt_modified: '2019-11-18 11:10:58'
    }
  ])
  await Course.insertMany([
    {
     id: new Types.ObjectId(),
      teacher_id: '1189389726308478977',
      subject_id: '1178214681139539969',
      subject_parent_id: '1178214681118568449',
      title: 'java基础课程：test',
      price: 0.01,
      lesson_num: 2,
      cover: 'https://guli-file-190513.oss-cn-beijing.aliyuncs.com/cover/default.gif',
      buy_count: 4,
      view_count: 387,
      version: 1,
      status: 'Normal',
      is_deleted: 0,
      gmt_create: '2019-11-07 09:27:33',
      gmt_modified: '2019-11-18 13:35:03'
    }, {
     id: new Types.ObjectId(),
      teacher_id: '1189389726308478977',
      subject_id: '1101348944971091969',
      subject_parent_id: '1101348944920760321',
      title: 'XHTML CSS2 JS整站制作教程课程学习',
      price: 0.00,
      lesson_num: 3,
      cover: 'http://guli-file.oss-cn-beijing.aliyuncs.com/cover/2019/03/13/d0086eb0-f2dc-45f7-bba1-744d95e5be0f.jpg',
      buy_count: 3,
      view_count: 44,
      version: 15,
      status: 'Normal',
      is_deleted: 0,
      gmt_create: '2018-04-02 18:33:34',
      gmt_modified: '2019-11-16 21:21:45'
    }, {
     id: new Types.ObjectId(),
      teacher_id: '1189389726308478977',
      subject_id: '1101348944971091969',
      subject_parent_id: '1101348944920760321',
      title: 'HTML5入门课程学习',
      price: 0.00,
      lesson_num: 23,
      cover: 'http://guli-file.oss-cn-beijing.aliyuncs.com/cover/2019/03/13/22997b8e-3606-4d2e-9b4f-09f48418b6e4.jpg',
      buy_count: 0,
      view_count: 51,
      version: 17,
      status: 'Normal',
      is_deleted: 0,
      gmt_create: '2018-04-02 18:34:32',
      gmt_modified: '2019-11-12 10:19:20'
    }, {
     id: new Types.ObjectId(),
      teacher_id: '1189389726308478977',
      subject_id: '1178214681139539969',
      subject_parent_id: '1178214681118568449',
      title: 'Java精品课程',
      price: 0.01,
      lesson_num: 20,
      cover: 'http://guli-file.oss-cn-beijing.aliyuncs.com/cover/2019/03/06/866e9aca-b530-4f71-a690-72d4a4bfd1e7.jpg',
      buy_count: 151,
      view_count: 737,
      version: 6,
      status: 'Normal',
      is_deleted: 0,
      gmt_create: '2018-04-02 21:28:46',
      gmt_modified: '2019-11-18 11:14:52'
    }
  ])
  await Course_collect.insertMany([
    {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      member_id: '1',
      is_deleted: 1,
      gmt_create: '2019-11-18 11:30:12',
      gmt_modified: '2019-11-18 11:30:12'
    }
  ])
  await Course_description.insertMany([
    {
     id: new Types.ObjectId(),
      description: '<p>11</p>',
      gmt_create: '2019-03-11 06:23:44',
      gmt_modified: '2019-03-11 06:23:44'
    }, {
     id: new Types.ObjectId(),
      description: '<p>测试</p>',
      gmt_create: '2019-11-07 09:27:33',
      gmt_modified: '2019-11-13 16:21:28'
    }, {
     id: new Types.ObjectId(),
      description: '',
      gmt_create: '2019-03-13 06:04:43',
      gmt_modified: '2019-03-13 06:05:33'
    }, {
     id: new Types.ObjectId(),
      description: '',
      gmt_create: '2019-03-13 06:03:33',
      gmt_modified: '2019-03-13 06:04:22'
    }, {
     id: new Types.ObjectId(),
      description: '<p>本套Java视频完全针对零基础学员，课堂实录，自发布以来，好评如潮！Java视频中注重与学生互动，讲授幽默诙谐、细致入微，覆盖Java基础所有核心知识点，同类Java视频中也是代码量大、案例多、实战性强的。同时，本Java视频教程注重技术原理剖析，深入JDK源码，辅以代码实战贯穿始终，用实践驱动理论，并辅以必要的代码练习。</p>\n<p>------------------------------------</p>\n<p>视频特点：</p>\n<p>通过学习本Java视频教程，大家能够真正将Java基础知识学以致用、活学活用，构架Java编程思想，牢牢掌握\"源码级\"的Javase核心技术，并为后续JavaWeb等技术的学习奠定扎实基础。<br /><br />1.通俗易懂，细致入微：每个知识点高屋建瓴，深入浅出，简洁明了的说明问题<br />2.具实战性：全程真正代码实战，涵盖上百个企业应用案例及练习<br />3.深入：源码分析，更有 Java 反射、动态代理的实际应用等<br />4.登录尚硅谷官网，技术讲师免费在线答疑</p>',
      gmt_create: '2019-03-06 18:06:36',
      gmt_modified: '2019-10-30 19:58:36'
    }
  ])
  await Subjects.insertMany([
    {
     id: new Types.ObjectId(),
      title: '后端开发',
      parent_id: '0',
      sort: 1,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Java',
      parent_id: '1178214681118568449',
      sort: 1,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '前端开发',
      parent_id: '0',
      sort: 3,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'JavaScript',
      parent_id: '1178214681181483010',
      sort: 4,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '云计算',
      parent_id: '0',
      sort: 5,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Docker',
      parent_id: '1178214681231814658',
      sort: 5,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Linux',
      parent_id: '1178214681231814658',
      sort: 6,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '系统/运维',
      parent_id: '0',
      sort: 7,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Linux',
      parent_id: '1178214681324089345',
      sort: 7,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Windows',
      parent_id: '1178214681324089345',
      sort: 8,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '数据库',
      parent_id: '0',
      sort: 9,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'MySQL',
      parent_id: '1178214681399586817',
      sort: 9,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'MongoDB',
      parent_id: '1178214681399586817',
      sort: 10,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '大数据',
      parent_id: '0',
      sort: 11,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Hadoop',
      parent_id: '1178214681483472898',
      sort: 11,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Spark',
      parent_id: '1178214681483472898',
      sort: 12,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '人工智能',
      parent_id: '0',
      sort: 13,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Python',
      parent_id: '1178214681554776066',
      sort: 13,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: '编程语言',
      parent_id: '0',
      sort: 14,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Java',
      parent_id: '1178214681613496321',
      sort: 14,
      gmt_create: '2019-09-29 15:47:25',
      gmt_modified: '2019-09-29 15:47:25'
    }, {
     id: new Types.ObjectId(),
      title: 'Python',
      parent_id: '1178214681118568449',
      sort: 2,
      gmt_create: '2019-09-30 16:19:22',
      gmt_modified: '2019-09-30 16:19:22'
    }, {
     id: new Types.ObjectId(),
      title: 'HTML/CSS',
      parent_id: '1178214681181483010',
      sort: 3,
      gmt_create: '2019-09-30 16:19:22',
      gmt_modified: '2019-09-30 16:19:22'
    }
  ])
  await Teacher.insertMany([
    {
      id: new Types.ObjectId(),
      name: '张三',
      intro: '近年主持国家自然科学基金（6项）、江苏省重大科技成果转化项目（5项）、江苏省产学研前瞻性联合研究项目（3项）、省工业科技支撑、省高技术、省自然科学基金等省部级及其企业的主要科研项目40多个，多个项目在企业成功转化，产生了较好的经济、社会和环境效益。积极开展产学研科技合作，并与省内16家企业建立了江苏省研究生工作站，其中6家为江苏省优秀研究生工作站',
      career: '高级',
      level: 1,
      avatar: 'https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg',
      sort: 0,
      is_deleted: 0,
      gmt_create: '2019-10-30 14:18:46',
      gmt_modified: '2019-11-12 13:36:36'
    }, {
      id: new Types.ObjectId(),
      name: '晴天',
      intro: '高级讲师简介',
      career: '高级讲师资历',
      level: 2,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/de47ee9b-7fec-43c5-8173-13c5f7f689b2.png',
      sort: 1,
      is_deleted: 0,
      gmt_create: '2019-10-30 11:53:03',
      gmt_modified: '2019-10-30 11:53:03'
    }, {
      id: new Types.ObjectId(),
      name: '李刚',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 2,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/b8aa36a2-db50-4eca-a6e3-cc6e608355e0.png',
      sort: 2,
      is_deleted: 0,
      gmt_create: '2019-10-30 11:55:19',
      gmt_modified: '2019-11-12 13:37:52'
    }, {
      id: new Types.ObjectId(),
      name: '王二',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/08/e44a2e92-2421-4ea3-bb49-46f2ec96ef88.png',
      sort: 0,
      is_deleted: 0,
      gmt_create: '2019-10-30 14:18:56',
      gmt_modified: '2019-11-12 13:37:35'
    }, {
      id: new Types.ObjectId(),
      name: '王五',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/10/30/65423f14-49a9-4092-baf5-6d0ef9686a85.png',
      sort: 0,
      is_deleted: 0,
      gmt_create: '2019-10-30 14:19:02',
      gmt_modified: '2019-11-12 13:37:18'
    }, {
      id: new Types.ObjectId(),
      name: '李四',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/07/91871e25-fd83-4af6-845f-ea8d471d825d.png',
      sort: 0,
      is_deleted: 0,
      gmt_create: '2019-11-07 09:18:25',
      gmt_modified: '2019-11-12 13:37:01'
    }, {
      id: new Types.ObjectId(),
      name: '1222-12-12',
      intro: '1111',
      career: '11',
      level: 1,
      avatar: 'https://online-teach-file.oss-cn-beijing.aliyuncs.com/teacher/2019/11/08/5805c6cd-c8ad-4a77-aafd-d2e083bfd8a4.png',
      sort: 0,
      is_deleted: 1,
      gmt_create: '2019-11-07 14:26:37',
      gmt_modified: '2019-11-11 16:26:26'
    }, {
      id: new Types.ObjectId(),
      name: 'test',
      intro: 'sdfsdf',
      career: 'sdfdf',
      level: 1,
      avatar: 'https://guli-file-190513.oss-cn-beijing.aliyuncs.com/avatar/default.jpg',
      sort: 0,
      is_deleted: 1,
      gmt_create: '2019-11-15 21:47:12',
      gmt_modified: '2019-11-15 21:47:27'
    }
  ])
  await Video.insertMany([
    {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '32',
      title: '第一节',
      video_source_id: '',
      video_original_name: '',
      sort: 0,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: '',
      size: 0,
      version: 1,
      gmt_create: '2019-10-11 11:32:59',
      gmt_modified: '2019-10-11 11:57:38'
    }, {
     id: new Types.ObjectId(),
      course_id: '14',
      chapter_id: '1',
      title: '12',
      video_source_id: '',
      video_original_name: '',
      sort: 0,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-10-19 05:51:23',
      gmt_modified: '2019-10-19 05:51:33'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '44',
      title: '测试',
      video_source_id: '',
      video_original_name: '',
      sort: 1,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-10-30 14:51:55',
      gmt_modified: '2019-10-30 14:51:55'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '1181729226915577857',
      title: 'test',
      video_source_id: '2b887dc9584d4dc68908780ec57cd3b9',
      video_original_name: '视频',
      sort: 1,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-10-30 17:17:41',
      gmt_modified: '2019-10-30 17:17:41'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '1181729226915577857',
      title: '22',
      video_source_id: '5155c73dc112475cbbddccf4723f7cef',
      video_original_name: '视频.mp4',
      sort: 0,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-10-30 17:37:29',
      gmt_modified: '2019-10-30 17:37:29'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      chapter_id: '1192252428399751169',
      title: '第一课时',
      video_source_id: '756cf06db9cb4f30be85a9758b19c645',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 0,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-11-07 09:29:59',
      gmt_modified: '2019-11-07 09:29:59'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      chapter_id: '1192252428399751169',
      title: '第二课时',
      video_source_id: '2a02d726622f4c7089d44cb993c531e1',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 0,
      play_count: 0,
      is_free: 1,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-11-08 10:21:10',
      gmt_modified: '2019-11-08 10:21:22'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      chapter_id: '1192252428399751169',
      title: '第三课时',
      video_source_id: '4e560c892fdf4fa2b42e0671aa42fa9d',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 0,
      play_count: 0,
      is_free: 1,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-11-08 10:38:40',
      gmt_modified: '2019-11-08 10:38:40'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      chapter_id: '1192252428399751169',
      title: '第四课时',
      video_source_id: '4e560c892fdf4fa2b42e0671aa42fa9d',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 0,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-11-12 13:00:05',
      gmt_modified: '2019-11-12 13:00:05'
    }, {
     id: new Types.ObjectId(),
      course_id: '1192252213659774977',
      chapter_id: '1192252428399751169',
      title: '第五课时',
      video_source_id: '27d21158b0834cb5a8d50710937de330',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 5,
      play_count: 0,
      is_free: 0,
      duration: 0,
      status: 'Empty',
      size: 0,
      version: 1,
      gmt_create: '2019-11-18 11:08:03',
      gmt_modified: '2019-11-18 11:08:03'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '15',
      title: '第一节：Java简介',
      video_source_id: '196116a6fee742e1ba9f6c18f65bd8c1',
      video_original_name: '1',
      sort: 1,
      play_count: 1000,
      is_free: 1,
      duration: 100,
      status: 'Draft',
      size: 0,
      version: 1,
      gmt_create: '2019-01-01 13:08:57',
      gmt_modified: '2019-10-11 11:26:39'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '15',
      title: '第二节：表达式和赋值语句',
      video_source_id: '2d99b08ca0214909899910c9ba042d47',
      video_original_name: '7 - How Do I Find Time for My ',
      sort: 2,
      play_count: 999,
      is_free: 1,
      duration: 100,
      status: 'Draft',
      size: 0,
      version: 1,
      gmt_create: '2019-01-01 13:09:02',
      gmt_modified: '2019-03-08 03:30:27'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '15',
      title: '第三节：String类',
      video_source_id: '51120d59ddfd424cb5ab08b44fc8b23a',
      video_original_name: 'eae2b847ef8503b81f5d5593d769dde2.mp4',
      sort: 3,
      play_count: 888,
      is_free: 0,
      duration: 100,
      status: 'Draft',
      size: 0,
      version: 1,
      gmt_create: '2019-01-01 13:09:05',
      gmt_modified: '2019-11-12 12:50:45'
    }, {
     id: new Types.ObjectId(),
      course_id: '18',
      chapter_id: '15',
      title: '第四节：程序风格',
      video_source_id: '2a38988892d84df598752226c50f3fa3',
      video_original_name: '00-day10总结.avi',
      sort: 4,
      play_count: 666,
      is_free: 0,
      duration: 100,
      status: 'Draft',
      size: 0,
      version: 1,
      gmt_create: '2019-01-01 13:09:05',
      gmt_modified: '2019-10-11 09:20:09'
    }
  ])

  db.disconnect()
}
main()