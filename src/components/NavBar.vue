<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Select, CloseBold } from '@element-plus/icons-vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { useUserStore } from '@/stores'
const loginSrc = ref('src/assets/avatar.png')
const router = useRouter()
const loginDrawer = ref(false)
const activeTab = ref('login')
const yesValue = ref(false) //确认许可
const loginForm = ref({ username: '', password: '' })
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: ''
})
const userStore = useUserStore()
const handleClick = (tab, event) => {
  console.log(tab, event)
}

const submitForm = async () => {
  if (yesValue.value) {
    if (activeTab.value === 'login') {
      try {
        const res = await userLoginService(loginForm.value) // 登录
        ElMessage.success('登录成功') // 提示登录成功
        userStore.setToken(res.data.data) // 存储token
        loginDrawer.value = false
        yesValue.value = false
        userStore.getUserInfo()
        // router.push('/')
        // //未解决登录后页面刷新问题
        // window.location.reload(true)
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        // // 登录成功后执行页面刷新
        // window.location.reload(true) // 传递参数 true 表示强制从服务器重新加载页面
        console.log('登录用户:', res)
        router.push('/')
      } catch (error) {
        // 处理登录失败的情况
        console.error('登录失败:', error)
        // 可以添加适当的错误处理逻辑或者提示用户登录失败的信息
      }
    } else {
      const res = await userRegisterService({
        username: registerForm.value.username,
        password: registerForm.value.password,
        role: registerForm.value.role
      }) //注册
      ElMessage.success('注册成功') //提示注册成功
      userStore.setToken(res.data.data) //存储token
      yesValue.value = false
      router.push('/')
      console.log('注册用户:', res)
    }
    loginDrawer.value = false
  } else {
    ElMessage.error('请先确认许可')
  }
}

const cancelClick = () => {
  loginDrawer.value = false
}
const logout = () => {
  userStore.setToken('')
  userStore.setUserInfo({})
  router.push('/')
}
onMounted(async () => {
  if (userStore.token) {
    userStore.getUserInfo()
  }
})
</script>

<template>
  <el-menu
    router
    :default-active="this.$route.path"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
  >
    <el-menu-item index="/" class="no-underline">
      <img style="width: 50px" src="@/assets/logo.png" />
      <p>怀化市招聘系统</p>
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="/">首页 </el-menu-item>
    <el-menu-item index="/workhome">招聘大厅</el-menu-item>
    <el-menu-item index="/jobhome">求职大厅</el-menu-item>
    <div class="flex-grow" />
    <el-sub-menu v-if="userStore.token" index="/user">
      <template #title>
        <el-tag
          v-if="userStore.userInfo.vip === 0"
          type="warning"
          size="large"
          style="margin-right: 10px"
          >普通会员
        </el-tag>
        <el-tag
          v-if="userStore.userInfo.vip === 1"
          type="success"
          size="large"
          style="margin-right: 10px"
          >高级会员
        </el-tag>
        <img style="width: 50px" :src="userStore.userInfo.avatar" />
        <span>{{ userStore.userInfo.username }}</span>
      </template>
      <el-menu-item index="/user">个人中心</el-menu-item>
      <el-menu-item @click="logout()">退出登录</el-menu-item>
    </el-sub-menu>
    <el-menu-item v-else @click="login()">
      <el-button
        size="large"
        type="primary"
        color="#626aef"
        @click="loginDrawer = true"
        >登录
      </el-button>
    </el-menu-item>
  </el-menu>
  <div class="h-6" />
  <el-drawer v-model="loginDrawer" :direction="direction" size="500">
    <el-row>
      <el-image
        style="width: 100px; height: 100px"
        :src="loginSrc"
        :fit="none"
      ></el-image>
      <el-text style="font-size: 40px" type="success">怀化市招聘系统</el-text>
    </el-row>
    <el-row style="margin-top: 50px"></el-row>
    <el-tabs v-model="activeTab" @tab-click="handleClick" type="border-card">
      <el-tab-pane label="登录" name="login">
        <el-form ref="loginFormRef" :model="loginForm" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
        </el-form>
        <el-row justify="center">
          <el-button @click="cancelClick">取消</el-button>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form :model="registerForm" label-width="80px" :label-position="top">
          <el-form-item prop="username" label="用户名">
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              v-model="registerForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              type="password"
              v-model="registerForm.confirmPassword"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="registerForm.role" placeholder="请选择角色">
              <el-option label="求职者" value="1"></el-option>
              <el-option label="招聘者" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-row justify="center"
            ><el-button @click="cancelClick">取消</el-button>
            <el-button type="primary" @click="submitForm">注册 </el-button>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-row justify="center" style="margin-top;: 50%">
      <el-switch
        v-model="yesValue"
        :active-action-icon="Select"
        :inactive-action-icon="CloseBold"
      />
      <el-text> 您已经仔细阅读并同意</el-text>
      <el-text>《隐私政策》 与 《用户服务协议》</el-text>
    </el-row>
  </el-drawer>
</template>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

/* .login-button {
  font-size: 20px !important;
  font-family: Arial, sans-serif !important;
} */
</style>
