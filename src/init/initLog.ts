import FileStreamRotator from 'file-stream-rotator'
import morgan from 'morgan'
import path from 'path'
import { Express } from 'express-serve-static-core'
import fs from 'fs'
import util from 'util'
import { formatDate } from '../util/base'

function myLog () {
  // debug 写入文件, info 只输出到控制台
  globalThis.console.debug = function (...args) {
    const data = util.format.apply(null, args) + '\n'
    fs.appendFileSync('log/my-debug.log', formatDate(new Date()) + ' ' + data)
  }
  globalThis.console.log = function (...args) {
    const data = util.format.apply(null, args) + '\n'
    fs.appendFileSync('log/my-log.log', formatDate(new Date()) + ' ' + data)
    process.stdout.write(data)
  }
  globalThis.console.error = function (...args) {
    const data = util.format.apply(null, args) + '\n'
    fs.appendFileSync('log/my-error.log', formatDate(new Date()) + ' ' + data)
    process.stdout.write(data)
  }
}

export default function initLog (app: Express) {
  const accessLogStream = FileStreamRotator.getStream({
    filename: path.join('log', '%DATE%.log'),
    frequency: 'daily',
    verbose: false,
  })

  // setup the logger
  app.use(morgan('combined', { stream: accessLogStream }))

  myLog()
}