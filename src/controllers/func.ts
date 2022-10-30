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

export function checkSyntax(data: Record<string, unknown>, dataType: Record<string, string>) {
    Object.keys(data).forEach((prop) => {
      if (dataType[prop] === 'number') {
        if (isNaN(Number(data[prop]))) {
          data[prop] = undefined
        } else {
          data[prop] = Number(data[prop])
        }
      }
      if (typeof data[prop] !== dataType[prop]) {
        throw new PropertySyntaxError(prop)
      }
    })
}