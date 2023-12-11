<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  updateUserInfoService,
  updatePasswordService,
  updateAvatarService
} from '@/api/user'
import { useUserStore } from '@/stores'
import { Plus } from '@element-plus/icons-vue'
const router = useRouter()
const { getUserInfo } = useUserStore()
const userStore = useUserStore()
const userInfo = userStore.userInfo
const editInfo = ref(false)

const editPassword = ref(false) //修改密码
const passwordForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const updatePassword = async () => {
  await updatePasswordService(passwordForm.value)
  editPassword.value = false
  ElMessage.success('更新密码成功')
}
const imageUrl = ref(userStore.userInfo.avatar)
const imgFile = ref()
const uploadRef = ref()
const onUploadFile = (file) => {
  // 生成url
  imageUrl.value = URL.createObjectURL(file.raw)
  // 保存文件
  imgFile.value = file.raw
  console.log('初步上传', userInfo)
}

const updateUserInfo = async () => {
  // 校验
  if (!imgFile.value) {
    ElMessage.error('请选择新图片')
    return
  }
  // 上传文件
  const res = await updateAvatarService(imgFile.value)
  console.log('sad', res.data.data)
  userInfo.avatar = res.data.data
  console.log(userInfo)
  console.log('图片上传后更新的', userInfo)
  await updateUserInfoService(userInfo)
  editInfo.value = false
  ElMessage.success('更新用户信息成功')
  getUserInfo()
  router.push('/')
}
const comeVip = async () => {
  await ElMessageBox.confirm('确认充值vip会员吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    type: 'success'
  })
  userInfo.vip = 2
  console.log('充值会员', userInfo)
  await updateUserInfoService(userInfo)
  getUserInfo()
}
</script>

<template>
  <div class="center">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户信息</span>
          <el-button @click="comeVip()" v-if="userInfo.vip === 0"
            >充值vip</el-button
          >
          <el-button type="success" @click="editPassword = true"
            >修改密码
          </el-button>
        </div>
      </template>
      <el-form
        label-position="top"
        :model="userInfo"
        label-width="120px"
        size="large"
      >
        <el-form-item label="用户名">
          <el-input v-model="userInfo.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="昵称" disabled prop="nickname">
          <el-input v-model="userInfo.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <el-col :span="12">
            <el-upload
              ref="uploadRef"
              class="avatar-uploader"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="onUploadFile"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <img v-else src="@/assets/avatar.png" width="108" />
            </el-upload>
            <br />
            <el-button
              @click="uploadRef.$el.querySelector('input').click()"
              type="primary"
              :icon="Plus"
              size="small"
            >
              选择图片
            </el-button>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-row justify="center">
          <el-button type="success" v-if="editInfo" @click="updateUserInfo"
            >更新</el-button
          >
          <el-button type="primary" v-else @click="editInfo = true"
            >编辑</el-button
          >
        </el-row>
      </template>
      <el-dialog
        v-model="editPassword"
        title="修改密码"
        width="30%"
        destroy-on-close
        center
      >
        <el-form :model="passwordForm" label-position="top" label-width="120px">
          <el-form-item label="原密码">
            <el-input v-model="passwordForm.old_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="passwordForm.new_pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input v-model="passwordForm.re_pwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="editPassword = false">取消</el-button>
            <el-button type="primary" @click="updatePassword">修改</el-button>
          </span>
        </template>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped>
/* .center {
  justify-content: center;
  align-items: center;
  height: 100vh;
} */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
