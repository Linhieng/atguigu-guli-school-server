
// 我的自定义错误
declare class MyError extends Error {
  constructor(message: string)
}
declare class ReadError extends MyError {
  cause: Record<string, unknown>
  constructor (message: string, cause: Record<string, unknown>)
}
// 统一 PropertyRequiredError 和 PropertySyntaxError
declare class ValidationError extends MyError { }
// 校验类型不通过 错误
declare class PropertyRequiredError extends ValidationError {
  constructor(property: string)
}
// 属性格式 错误
declare class PropertySyntaxError extends ValidationError {
  constructor(property: string)
}
