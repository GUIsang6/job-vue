import { createRouter, createWebHistory } from 'vue-router' // 导入Vue路由器和Web历史记录
import { useUserStore } from '@/stores' // 使用用户存储
import { ElMessage } from 'element-plus' // 导入Element-Plus消息提示组件

const router = createRouter({
  // 创建路由器实例
  history: createWebHistory(import.meta.env.BASE_URL), // 创建Web历史记录
  routes: [
    // 路由配置
    { path: '/', component: () => import('@/views/layout/index.vue') }, // 路径：首页
    {
      path: '/workhome', // 路径：工作主页
      component: () => import('@/views/workhome/index.vue')
    },
    { path: '/jobhome', component: () => import('@/views/jobhome/index.vue') }, // 路径：工作首页
    {
      path: '/user', // 路径：用户页面
      component: () => import('@/views/user/UserPage.vue'),
      redirect: '/user/userinfo', // 重定向到用户信息
      children: [
        { path: 'getjob', component: () => import('@/views/user/GetJob.vue') }, // 子路径：获取工作
        {
          path: 'resume', // 子路径：简历
          component: () => import('@/views/user/ResumePage.vue')
        },
        {
          path: 'userinfo', // 子路径：用户信息
          component: () => import('@/views/user/UserInfo.vue')
        },
        {
          path: 'postjob', // 子路径：发布工作
          component: () => import('@/views/boos/PostJob.vue')
        },
        {
          path: 'personnel', // 子路径：人员
          component: () => import('@/views/admin/personnel/index.vue')
        },
        {
          path: 'checkGetJob', // 子路径：检查获取工作
          component: () => import('@/views/admin/check/CheckGetJob.vue')
        },
        {
          path: 'checkPostJob', // 子路径：检查发布工作
          component: () => import('@/views/admin/check/CheckPostJob.vue')
        },
        {
          path: 'checkVip', // 子路径：检查VIP
          component: () => import('@/views/admin/check/CheckVip.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  // 导航守卫
  const userStore = useUserStore() // 使用用户存储
  const userinfo = userStore.userInfo // 用户信息
  const token = userStore.token // 用户令牌
  const whiteList = ['/', '/workhome', '/jobhome'] // 无需登录即可访问的页面路径白名单
  console.log(userinfo)
  if (!token && !whiteList.includes(to.path)) {
    // 如果没有令牌且访问路径不在白名单中
    next('/') // 跳转至首页
    ElMessage.error('请先登录注册') // 显示错误消息
  } else {
    next() // 继续导航
  }
})
export default router // 导出路由器配置
