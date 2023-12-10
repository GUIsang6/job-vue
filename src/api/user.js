import request from '@/utils/request'

//注册
export const userRegisterService = (data) => {
  const params = new URLSearchParams() //x-www-form-urlencoded
  for (let key in data) {
    params.append(key, data[key])
  }
  return request.post('/user/register', params)
}
//登录
export const userLoginService = (data) => {
  const params = new URLSearchParams() //x-www-form-urlencoded
  for (let key in data) {
    params.append(key, data[key])
  }
  return request.post('/user/login', params)
}
//获取用户信息
export const getUserInfoService = () => {
  return request.get('/user/userInfo')
}
//更新用户信息
export const updateUserInfoService = (data) => {
  return request.post('/user/update', data)
}
//更新密码
export const updatePasswordService = (data) => {
  return request.patch('/user/updatePassword', data)
}
// 更新头像
export const updateAvatarService = (file) => {
  const formData = new FormData()
  formData.append('file', file)

  return request.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
