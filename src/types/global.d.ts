declare module 'file-stream-rotator'
declare module 'morgan'

declare const SUCCESS = 20000 // 状态码: 成功
declare const ERROR = 20001 // 状态码: 失败
type StatusCode = (
  typeof SUCCESS |
  typeof ERROR
)

// 统一返回结果
declare interface R {
  success: boolean, // 是否成功
  code: StatusCode, // 返回码; 20000 成功; 20001 失败;
  message: string, // 返回消息
  data: map<string, object>, // 返回数据
}
