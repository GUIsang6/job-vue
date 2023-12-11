import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: () => import('@/views/layout/index.vue') },
    {
      path: '/workhome',
      component: () => import('@/views/workhome/index.vue')
    },
    { path: '/jobhome', component: () => import('@/views/jobhome/index.vue') },
    {
      path: '/user',
      component: () => import('@/views/user/UserPage.vue'),
      redirect: '/user/userinfo',
      children: [
        { path: 'getjob', component: () => import('@/views/user/GetJob.vue') },
        {
          path: 'resume',
          component: () => import('@/views/user/ResumePage.vue')
        },
        {
          path: 'userinfo',
          component: () => import('@/views/user/UserInfo.vue')
        },

        {
          path: 'postjob',
          component: () => import('@/views/boos/PostJob.vue')
        },
        {
          path: 'personnel',
          component: () => import('@/views/admin/personnel/index.vue')
        },
        {
          path: 'checkGetJob',
          component: () => import('@/views/admin/check/CheckGetJob.vue')
        },
        {
          path: 'checkPostJob',
          component: () => import('@/views/admin/check/CheckPostJob.vue')
        },
        {
          path: 'checkVip',
          component: () => import('@/views/admin/check/CheckVip.vue')
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const userinfo = userStore.userInfo
  const token = userStore.token
  const whiteList = ['/', '/workhome', '/jobhome'] // 不需要登录就可以访问的页面的路由路径
  console.log(userinfo)
  if (!token && !whiteList.includes(to.path)) {
    next('/')
    ElMessage.error('请先登录注册')
  } else {
    next()
  }
})
export default router
