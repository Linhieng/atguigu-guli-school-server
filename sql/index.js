import { connect } from 'mongoose'
import {
  EduTeacher,
  EduSubject,
  EduSubjectChildren,
  EduCourse,
} from '../dist/src/models/eduModel.js'

async function create_edu () {
  const t = await EduTeacher.insertMany([
    {
      name: '张三',
      intro: '近年主持国家自然科学基金（6项）、江苏省重大科技成果转化项目（5项）、江苏省产学研前瞻性联合研究项目（3项）、省工业科技支撑、省高技术、省自然科学基金等省部级及其企业的主要科研项目40多个，多个项目在企业成功转化，产生了较好的经济、社会和环境效益。积极开展产学研科技合作，并与省内16家企业建立了江苏省研究生工作站，其中6家为江苏省优秀研究生工作站',
      career: '高级',
      level: 1,
      sort: 0,
    }, {
      name: '晴一',
      intro: '高级讲师简介',
      career: '高级讲师资历',
      level: 2,
      sort: 1,
    }, {
      name: '李刚',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 2,
      sort: 2,
    }, {
      name: '王二',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      sort: 0,
    }, {
      name: '王五',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      sort: 0,
    }, {
      name: '李四',
      intro: '高级讲师简介',
      career: '高级讲师',
      level: 1,
      sort: 0,
    }
  ])
  const s = await EduSubject.insertMany([
    {
      title: '后端开发',
      children: [],
      sort: 1,
    }, {
      title: '前端开发',
      children: [],
      sort: 3,
    }
  ])
  const sc = await EduSubjectChildren.create([
    {
      title: 'Java',
      parent_id: s[0]._id,
      sort: 1,
    }, {
      title: 'JavaScript',
      parent_id: s[1]._id,
      sort: 4,
    }, {
      title: 'CSS',
      parent_id: s[1]._id,
      sort: 5,
    }, {
      title: 'HTML',
      parent_id: s[1]._id,
      sort: 5,
    }
  ])
  await EduSubject.findOneAndUpdate({ title: '后端开发' }, {
    children: [sc[0]._id]
  })
  await EduSubject.findOneAndUpdate({ title: '前端开发' }, {
    children: [sc[1]._id, sc[2]._id, sc[3]._id]
  })
  const c = await EduCourse.insertMany([
    {
      teacher_id: t[0]._id,
      subject_id: sc[0]._id,
      subject_parent_id: s[0]._id,
      title: 'java基础课程：test',
      lesson_num: 2,
      cover: 'https://guli-file-190513.oss-cn-beijing.aliyuncs.com/cover/default.gif',
      buy_count: 4,
      view_count: 387,
      version: 1,
      status: 'Normal',
    }
  ])
}

async function main () {
  const db = await connect('mongodb://localhost:27017/guli')
  await create_edu()
  db.disconnect()
}
main()