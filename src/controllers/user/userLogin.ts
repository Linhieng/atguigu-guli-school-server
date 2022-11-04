import { handleRequest } from '../func'

// TODO
const userLogin = handleRequest(async (req) => {
  return { token: 'user-token' }
})
export default userLogin