import { connect, connection } from 'mongoose'
import config from './default.json'

const connectDB = () => {

  const { mongoURI, connectTimeoutMS, keepAliveInitialDelay }: TConfig = config

  const connectFun = async () => {
    console.log('reading connect')
    try {
      await connect(mongoURI, { connectTimeoutMS, keepAlive: true, keepAliveInitialDelay })
      console.log(`Successfully connected to ${mongoURI}`)
    } catch (err) {
      console.error('Error connecting to database: ' + (err as Error).message)
      process.exit(1)
    }
  }
  connectFun()
  connection.on('disconnected', connectFun)
  connection.on('close', () => {
    console.log('connect close')
  })
  connection.on('error', () => {
    console.error('connect error')
  })
  connection.on('connected', () => {
    console.log('Successfully connected')
  })

}

export default connectDB