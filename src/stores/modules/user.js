import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfoService } from '@/api/user'
//用户模块
export const useUserStore = defineStore(
  'job-user',
  () => {
    const token = ref('') //定义token
    const setToken = (t) => (token.value = t) //设置token
    const removeToken = () => (token.value = '') //移除token

    const userInfo = ref({})
    const getUserInfo = async () => {
      const info = await getUserInfoService()
      userInfo.value = info.data.data
      // console.log(userInfo.value)
    } //获取用户信息
    const setUserInfo = (val) => (userInfo.value = val) //设置或移除用户信息

    return {
      token,
      setToken,
      removeToken,
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true //持久化
  }
)
