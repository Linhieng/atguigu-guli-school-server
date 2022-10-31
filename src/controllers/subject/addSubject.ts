import { Types } from 'mongoose'
import { RequestHandler } from 'express'
import { EduSubject } from '../../models/subject'
import { checkFile, checkMime, factoryR } from '../func'
import xlsx from 'node-xlsx'

function checkData (file: Express.Multer.File) {
  checkFile(file)
  checkMime(file!, [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel'
  ], 'xls 和 xlsx')
}

// TODO: 查找 API, 考虑其他方式实现. 只考虑了一级目录的重复性, 暂未考虑二级目录重复的情况
async function saveSubject (buffer: Buffer) {

  const data = xlsx.parse(buffer)[0].data as Array<Array<string>>
  const newSubject: Record<string, Array<string>> = {}

  data.forEach((row, i) => {
    if (i === 0) return // 忽略首行

    if (newSubject[row[0]] instanceof Array) {
      newSubject[row[0]].push(row[1])
    } else {
      newSubject[row[0]] = []
      newSubject[row[0]].push(row[1])
    }
  })
  Object.keys(newSubject).forEach(async (key) => {
    const newChildren: Array<any> = []
    newSubject[key].forEach(title => {
      newChildren.push({
        id: new Types.ObjectId(),
        title,
        gmt_create: new Date()
      })
    })
    const data = await EduSubject.findOneAndUpdate({ title: key }, {
      '$push': { children: { $each: newChildren } }
    })
    if (data === null) {
      await EduSubject.insertMany([{
        id: new Types.ObjectId(),
        title: key,
        children: newChildren,
        gmt_create: new Date(),
      }])
    }
  })
}

const getAllSubject: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    checkData(req.file!)
    saveSubject(req.file!.buffer)

    result.data = {}

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '上传成功'
  } catch (e) {
    console.error(e)
    if (e instanceof ReadError) {
      status = 200
      result.success = false
      result.code = READ_ERROR
      result.message = e.message
    } else if (e instanceof SyntaxError) {
      status = 200
      result.success = false
      result.code = SYNTAX_ERROR
      result.message = e.message
      result.data = {
        mimetype: req.file?.mimetype
      }
    } else {
      result.message = (e as Error).name + ': ' + (e as Error).message
    }
  }

  res
    .status(status)
    .json(result)
}

export default getAllSubject