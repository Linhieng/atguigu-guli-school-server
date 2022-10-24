import log from '../util/log'
import { connect, connection } from 'mongoose'
import config from './default.json'

type TConfig = {
  mongoURI: string,
  connectTimeoutMS: number,
  keepAliveInitialDelay: number,
}

const connectDB = () => {

  const { mongoURI, connectTimeoutMS, keepAliveInitialDelay }: TConfig = config

  const connectFun = () => {
    log('reading connect')
    connect(mongoURI, { connectTimeoutMS, keepAlive: true, keepAliveInitialDelay })
      .then(() => {
        log(`Successfully connected to ${mongoURI}`)
        return console.info('Successfully connected')
      })
      .catch(err => {
        log('Error connecting to database: ' + (err as Error).message)
        return process.exit(1)
      })
  }
  connectFun()
  connection.on('disconnected', connectFun)
  connection.on('close', () => {
    log('connect close')
  })
  connection.on('error', () => {
    log('connect error')
  })
  connection.on('connected', () => {
    log('connect connected')
  })

}

export default connectDB