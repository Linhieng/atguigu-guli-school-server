declare module 'file-stream-rotator'
declare module 'morgan'
declare module 'cors'

declare const SUCCESS = 20000 // 状态码: 成功
declare const ERROR = 20001 // 状态码: 失败
declare const SYNTAX_ERROR = 20002 // 判断为 SyntaxError 时使用
declare const READ_ERROR = 20003 // 客户端传送过来的数据校验失败时使用
declare const M_VALIDATION_ERROR = 20004 // mongoose 的 ValidationError 错误
type StatusCode = (
  typeof SUCCESS |
  typeof ERROR |
  typeof SYNTAX_ERROR |
  typeof READ_ERROR |
  typeof M_VALIDATION_ERROR
)

// 统一返回结果
declare interface R {
  success: boolean, // 是否成功
  code: StatusCode, // 返回码; 20000 成功; 20001 失败;
  message: string, // 返回消息
  data: map<string, object>, // 返回数据
}
