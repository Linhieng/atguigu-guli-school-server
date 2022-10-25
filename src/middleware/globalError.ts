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
  res
    .status(500)
    .json(result)
}