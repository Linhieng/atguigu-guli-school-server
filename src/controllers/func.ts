export function factoryR (): R {
  return {
    success: false,
    code: ERROR,
    message: '',
    data: {},
  }
}

export function checkRequired (data: Record<string, unknown>, requiredProp: Record<string, any>) {
  Object.keys(requiredProp).forEach(prop => {
    if (Object.prototype.hasOwnProperty.call(data, prop) === false) {
      throw new PropertyRequiredError(prop)
    }
  })
}

/**
 * 简单的校验 data 的数据类型是否是 dataType 定义的一样
 * 允许 data 有多余的属性;
 * 允许字符类型的数字, 校验后会将字符转换为数字
 * @param data 待校验的数据对象
 * @param dataType 定义了 data 各个属性的类型, 支持基本数据类型和 Date
 */
export function checkSyntax (data: Record<string, unknown>, dataType: Record<string, string>) {
  Object.keys(data).forEach((prop) => {
    if (dataType[prop] === undefined) return

    if (dataType[prop] === 'number') {

      if (isNaN(Number(data[prop]))) {
        throw new PropertySyntaxError(prop)
      } else {
        data[prop] = Number(data[prop])
      }

    } else if (dataType[prop] === 'Date') {

      const d = new Date(data[prop] as any)
      if (isNaN(d.getTime())) {
        throw new PropertySyntaxError(prop)
      } else {
        data[prop] = d
      }

    } else if (typeof data[prop] !== dataType[prop]) {

      throw new PropertySyntaxError(prop)

    }
  })
}

export function checkFile (file?: Express.Multer.File) {
  if (!(file?.buffer instanceof Buffer)) {
    throw new ReadError('没有文件!', {})
  }
}

/**
 *
 * @param file 必须是 File 类型
 * @param mime 合法的 mimetype 前缀, 比如 image,
 * @returns 返回 mimetype 的后缀, 比如 image/png 返回 png
 */
export function checkMimePrefix (file: Express.Multer.File, mime: MimeTypePrefix): string {
  const mimetype = file.mimetype.split('/')
  if (mimetype[0] !== mime) {
    throw new SyntaxError(`请上传 ${mime} 类型的资源`)
  }
  return mimetype[1]
}

export function checkMime (file: Express.Multer.File, mimeArr: Array<string>, typeInfo?: string): string {
  const mimetype = file.mimetype
  if (!(mimeArr.includes(mimetype))) {
    throw new SyntaxError(`请上传 ${typeInfo ? typeInfo : mimetype} 类型的资源`)
  }
  return mimetype[1]
}