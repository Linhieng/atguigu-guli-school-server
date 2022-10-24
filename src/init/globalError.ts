import { Request, Response, NextFunction } from 'express'

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    next()
  }
  const result: R = {
    success: false,
    code: 20001,
    message: err.message,
    data: {},
  }
  res
    .status(500)
    .json(result)
}