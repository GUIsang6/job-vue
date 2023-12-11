import request from '@/utils/request'

//获取用户列表
export const getUserListService = (data) => {
  const params = new URLSearchParams()
  for (let key in data) {
    params.append(key, data[key])
  }
  return request.get('/admin/getUser', { params })
}
//删除用户
export const deleteUserByIdService = (userId) => {
  return request.delete('admin/deleteUser', { params: { userId } })
}
//新建用户
export const createUserService = (data) => {
  return request.post('/admin/addUser', data)
}
//审核求职信息
export const checkGetJobService = (data) => {
  return request.post('/admin/checkGetJob', data)
}
//审核招聘信息
export const checkPostJobService = (data) => {
  return request.post('/admin/checkPostJob', data)
}
//升级会员
export const checkVipService = (data) => {
  return request.post('/user/update', data)
}
