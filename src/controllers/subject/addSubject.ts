import { RequestHandler } from 'express'
import { checkFile, checkMime, factoryR } from '../func'
import xlsx from 'node-xlsx'
import { EduSubject, EduSubjectChildren } from '../../models/eduModel'

// NOTE: 未对表格的数据是否合格进行校验
function checkData (file: Express.Multer.File) {
  checkFile(file)
  checkMime(file!, [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ], 'xls 和 xlsx')
}

async function saveSubject (buffer: Buffer) {
  const newSubject: Record<string, Array<string>> = {}
  const excel = xlsx.parse(buffer)[0].data as Array<Array<string>>
  // key 是父专业, value 是子专业数组
  excel.forEach((row, i) => {
    if (i === 0) return // 忽略首行
    const parent = row[0]
    const child = row[1]
    if (newSubject[parent] instanceof Array) {
      newSubject[parent].push(child)
    } else {
      newSubject[parent] = []
      newSubject[parent].push(child)
    }
  })

  for (const parent of Object.keys(newSubject)) {

    let parentId: ObjectId
    let childTitle: Array<string> = []
    let createdChildren: Array<{ _id: ObjectId }>
    const oldParent = await EduSubject.exists({ title: parent })

    // 新的父专业:                     新增父专业 --> 创建子专业(title, parent_id) --> 将子专业 _id 更新到父专业中
    // 旧的父专业: 查询已有子专业 --> 过滤旧的子专业 --> 创建子专业(title, parent_id) --> 将子专业 _id 更新到父专业中
    if (oldParent === null) {

      const parentSubject = await EduSubject.insertMany({ title: parent })
      parentId = parentSubject[0]._id
      childTitle = newSubject[parent]

    } else {

      const newChildren: Array<any> = []

      const oes = (await EduSubject.findOne({ title: parent }).populate('children')) as null | { children: Array<string> }
      const oesc = oes?.children || []
      // 将已有的子专业提取到一个数组中, 并忽略大小写
      const oldChildArr = oesc.reduce((pre: Array<string>, cur: any) => ([...pre, (cur.title as string).toLocaleLowerCase()]), [])

      parentId = oldParent._id
      newSubject[parent].forEach(title => {
        if (false === oldChildArr.includes(title.toLocaleLowerCase())) {
          childTitle.push(title)
        }
      })

    }

    createdChildren = (await EduSubjectChildren.insertMany(
      childTitle.reduce((pre: Array<{}>, title) => {
        return [...pre, {
          parent_id: parentId,
          title
        }]
      }, [])
    )) as unknown as Array<{ _id: ObjectId }>

    await EduSubject.findOneAndUpdate({ title: parent }, {
      $push: {
        children: {
          $each: createdChildren.reduce((pre: Array<ObjectId>, cur) => {
            return [...pre, cur._id]
          }, [])
        }
      }
    })
  }

}

const addSubject: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    checkData(req.file!)
    await saveSubject(req.file!.buffer)

    result.data = {}

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '上传成功'
  } catch (e) {

    if (e instanceof ReadError) {
      console.debug(e)
      status = 200
      result.success = false
      result.code = READ_ERROR
      result.message = e.message
    } else if (e instanceof SyntaxError) {
      console.debug(e)
      status = 200
      result.success = false
      result.code = SYNTAX_ERROR
      result.message = e.message
      result.data = {
        mimetype: req.file?.mimetype
      }
    } else {
      console.error(e)
      result.message = (e as Error).name + ': ' + (e as Error).message
    }
  }

  res
    .status(status)
    .json(result)
}

export default addSubject