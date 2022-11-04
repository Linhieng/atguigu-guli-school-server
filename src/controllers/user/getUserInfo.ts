import { handleRequest } from '../func'

// TODO
const getUserInfo = handleRequest(async (req) => {
  return {
    roles: '[admin]',
    name: 'admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  }
})
export default getUserInfo