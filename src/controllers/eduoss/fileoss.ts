import { RequestHandler } from 'express'
import { catchError, checkFile, checkMimePrefix, factoryR } from '../func'
import OSS from 'ali-oss'
import { onlyOne } from '../../util/base'
import privateData from '../../../private.json'

function checkAndGetSuffix (file: Express.Multer.File): string {
  return checkMimePrefix(file, 'image')
}

async function updateOss (fileFullName: string, buffer: Buffer) {
  /* NOTE: 明文 */
  const client = new OSS({
    // 填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: privateData.region,
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: privateData.accessKeyId,
    accessKeySecret: privateData.accessKeySecret,
    // 填写存储空间名称。
    bucket: privateData.bucket,
  })
  const result = await client.put(fileFullName, buffer)
  return result.url
}

const fileoss: RequestHandler = async (req, res) => {
  const result = factoryR()
  let status = 500

  try {

    checkFile(req.file)
    const suffix = checkAndGetSuffix(req.file as Express.Multer.File)
    const url = await updateOss(onlyOne() + '.' + suffix, req.file!.buffer)
    result.data = { url }

    status = 200
    result.success = true
    result.code = SUCCESS
    result.message = '请求成功'
  } catch (e) {

    const { status: s, code, message, data } = catchError(e as Error)
    status = s
    result.success = false
    result.code = code
    result.message = message
    result.data = data

  }

  res
    .status(status)
    .json(result)
}
export default fileoss