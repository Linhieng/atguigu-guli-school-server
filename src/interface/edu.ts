import { Types } from 'mongoose'

export interface IEduTeacher {
  id: Types.ObjectId, // 讲师ID; 主键
  name: string, // 讲师姓名; 外键 uk_name
  intro: string, // 讲师简介
  career: string, // 一句话说明讲师
  level: number, // 头衔 1高级讲师 2首席讲师
  avatar: string, // 讲师头像
  sort: number, // 排序
  is_deleted: boolean, // 逻辑删除
  gmt_create: Date, // 创建时间
  gmt_modified: Date | null, // 更新时间
}