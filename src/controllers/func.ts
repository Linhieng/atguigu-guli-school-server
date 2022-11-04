import { RequestHandler } from "express"
import { Error, Types } from "mongoose"

/**
 *
 * @returns 统一的 response 响应格式对象
 */
export function factoryR (): R {
  return {
    success: false,
    code: ERROR,
    message: '',
    data: {},
  }
}

/**
 * 只对属性是否存在进行校验, 不会校验他的值
 * @param data 待检查的对象
 * @param requiredProp 一个对象, key 是必须存在的属性, 不关注 value (可为 undefined)
 */
export function checkRequired (data: Record<string, unknown>, requiredProp: Record<string, any>) {
  Object.keys(requiredProp).forEach(prop => {
    if (Object.prototype.hasOwnProperty.call(data, prop) === false) {
      throw new PropertyRequiredError(prop)
    }
  })
}

/**
 * @前置要求 要求通过 checkRequired 校验, 即: dataType 的 key 是 data 中的 key 的子集!
 * @功能简要 根据 dataType 中提供的 key(属性名) value(属性类型), 校验 data 中对应的属性的类型是否符合要求
 * @注意　 该函数仅做普遍通用的校验, 更加详细但不通用的校验, 请另起函数
 *        允许 data 有多余的属性;
 *        对于 number, 允许字符类型的数字, 并且校验后会将字符转换为数字
 *        对于 string, 允许空字符串
 *        对于 String, 不允许空字符串, 相当于 required
 *        对于 Date, 若校验成功会返回 Date 对象
 *        对于 ObjectId, 不允许空字符串和非法字符串
 *        除此之外的类型, 仅仅使用 typeof 进行简单校验
 * @param data 待校验的数据对象
 * @param dataType 定义了 data 各个属性的类型
 * @Error 如果校验失败, 会抛出 PropertySyntaxError
 */
export function checkSyntax (data: Record<string, unknown>, dataType: Record<string, string>) {
  Object.keys(data).forEach((prop) => {
    const expectType = dataType[prop]
    const realType = typeof data[prop]
    const realValue = data[prop]

    if (expectType === undefined) return

    if (expectType === 'number') {

      if (isNaN(Number(data[prop]))) {
        throw new PropertySyntaxError(prop)
      } else {
        data[prop] = Number(data[prop])
      }

    } else if (expectType === 'Date') {

      const d = new Date(data[prop] as any)
      if (isNaN(d.getTime())) {
        throw new PropertySyntaxError(prop, '无法转换为日期')
      } else {
        data[prop] = d
      }

    } else if (expectType === 'ObjectId') {

      const s = data[prop] as string
      if (typeof s !== 'string') {
        throw new PropertySyntaxError(prop, '要求是字符串')
      }
      if (s.trim() === '') {
        throw new PropertySyntaxError(prop, '不允许空字符')
      }
      try {
        new Types.ObjectId(s)
      } catch (error) {
        throw new PropertySyntaxError(prop, '不是合法的 ObjectId 字符串')
      }

    } else if (expectType === 'String') {

      if (realType !== 'string') {
        throw new PropertySyntaxError(prop, '要求是字符串')
      }
      if ((realValue as string).trim() === '') {
        throw new PropertySyntaxError(prop, '不允许空字符串')
      }

    } else if (expectType !== realType) {

      throw new PropertySyntaxError(prop, `期待 ${expectType} 类型, 却收到 ${realType} 类型`)

    }
  })
}

/**
 * 只校验单文件是否存在文件数据
 * @param file 单个文件 req.file
 * @Error 文件不存在时, 抛出 ReadError
 */
export function checkFile (file?: Express.Multer.File) {
  if (!(file?.buffer instanceof Buffer)) {
    throw new ReadError('没有文件!', {})
  }
}

/**
 * 校验文件的 mimetype 前缀是否符合
 * @前置条件 文件必须存在, 一般结合 checkFile() 使用
 * @注意 不会真正识别文件类型, 只通过后缀名识别的
 * @param file 待校验的文件
 * @param mime 合法的 mimetype 前缀: text, image, audio, video, application
 * @returns 文件后缀名, 比如 image/png 返回 png
 * @Error 类型校验出错时, 抛出原生错误 SyntaxError
 */
export function checkMimePrefix (file: Express.Multer.File, mime: MimeTypePrefix): string {
  const mimetype = file.mimetype.split('/')
  if (mimetype[0] !== mime) {
    throw new SyntaxError(`请上传 ${mime} 类型的资源`)
  }
  return mimetype[1]
}

/**
 * 严格校验文件的 mimetype 类型
 * @前置条件 文件必须存在, 一般结合 checkFile() 使用
 * @param file 待校验的文件
 * @param mimeArr mimetype 字符串数组, 严格要求字符串匹配
 * @param typeInfo 当类型错误时提供的正确类型说明
 * @returns 文件后缀名, 比如 image/png 返回 png
 * @Error 校验失败时, 抛出原生错误 SyntaxError
 */
export function checkMime (file: Express.Multer.File, mimeArr: Array<string>, typeInfo?: string): string {
  const mimetype = file.mimetype
  if (!(mimeArr.includes(mimetype))) {
    throw new SyntaxError(`请上传 ${typeInfo ? typeInfo : mimetype} 类型的资源`)
  }
  return mimetype[1]
}

/**
 * 封装基本的属性校验, 进行属性是否存在和格式是否正确的基础校验
 * @param data
 * @param dataProp
 * @Error 校验失败时, 将 PropertyRequiredError 和 PropertySyntaxError 错误封装成 ReadError, 其他错误照常抛出
 */
export function wrappingCheckError (data: Record<string, unknown>, syntaxProp: Record<string, string>, requiredProp?: Record<string, string>) {

  try {
    if (requiredProp === undefined) requiredProp = syntaxProp
    checkRequired(data, requiredProp)
    checkSyntax(data, syntaxProp)
  } catch (e) {
    if (e instanceof PropertyRequiredError) {
      throw new ReadError(`缺少必要参数: ${e.property}`, {
        ...e,
        name: e.name,
        message: e.message,
      })
    } else if (e instanceof PropertySyntaxError) {
      throw new ReadError(`参数（${e.property}）格式错误`, {
        ...e,
        name: e.name,
        message: e.message,
      })
    } else {
      throw e
    }
  }
}

/**
 * 封装路由中 trycatch 中对错误的处理, 理想上, 在这其中应识别到所有预期的错误,
 * 具体的错误细节说明, 不由该函数负责
 * @param e trycatch 中 catch 到的错误
 * @returns 返回出错时响应的 data 数据
 */
export function catchError (e: Error) {
  const data: {
    status: number,
    code: StatusCode,
    message: string,
    data: Record<string, unknown>
  } = {
    status: 200,
    code: ERROR,
    message: '',
    data: {},
  }

  if (e instanceof ReadError) {

    console.debug(e)
    data.code = READ_ERROR
    data.message = e.message
    data.data = {
      name: e.name,
      cause: e.cause
    }

  } else if (e instanceof SyntaxError) {

    console.debug(e)
    data.code = SYNTAX_ERROR
    data.message = e.message

  } else if (e instanceof Error.CastError) {

    console.debug(e)
    data.code = M_CAST_ERROR
    data.message = e.message
    data.data = {
      stringValue: e.stringValue,
      name: e.name,
      kind: e.kind,
      value: e.value,
      path: e.path,
    }

  } else if (e instanceof Error.ValidationError) {

    console.debug(e)
    data.status = 200
    data.code = M_VALIDATION_ERROR
    data.message = e.name + ': ' + e.message
    data.data = e.errors

  } else {

    console.error(e)
    data.status = 500
    data.message = e.name + ': ' + e.message

  }

  return data
}

/**
 * 高阶函数, 作用是提取出响应时的重复工作, 比如: 处理报错, 响应的状态码和数据
 * @param cb 回调函数, 在这里面不需要 trycatch, handleRequest 已经帮忙做了, 返回的值会作为响应的数据
 * @param options 可选的相关配置, 暂时只想到了 successMessage
 * @returns 返回一个函数, 供 express 路由调用
 */
type handleOptions = {
  successMessage?: string
}
type Callback = (req: Express.Request) => any
export function handleRequest (cb: Callback, options?: handleOptions): RequestHandler {
  return async (req, res) => {
    const result = factoryR()
    let status = 500

    try {

      result.data = await cb(req) || {}

      status = 200
      result.success = true
      result.code = SUCCESS
      result.message = options?.successMessage || '请求成功'

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
}