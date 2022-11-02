import { RequestHandler } from 'express'
import { checkFile, checkMime, factoryR } from '../func'
import xlsx from 'node-xlsx'

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

}

const getAllSubject: RequestHandler = async (req, res) => {
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