import fs from 'fs'
import { formatDate } from './base'

export default function log (str: string) {
  fs.appendFileSync(
    'log.log',
    formatDate(new Date()) + ' ' + str + '\n',
  )
}