import { Request, Response, NextFunction } from 'express'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next()
  }
  console.error(err)

  const result: R = {
    success: false,
    code: ERROR,
    message: err.message,
    data: {},
  }
  let status = 500

  if (err instanceof SyntaxError) {
    status = 200
    result.code = SYNTAX_ERROR
  }

  res
    .status(status)
    .json(result)
}