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