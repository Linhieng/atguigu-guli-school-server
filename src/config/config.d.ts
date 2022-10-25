declare module '*.json' {
  const value: any
  export default value
}

declare type TConfig = {
  mongoURI: string,
  connectTimeoutMS: number,
  keepAliveInitialDelay: number,
}