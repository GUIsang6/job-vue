<script setup>
// import { ref, onMounted } from 'vue'
// import { useUserStore } from '@/stores'
import {
  EditPen,
  Setting,
  Document,
  ZoomOut,
  ZoomIn,
  ElementPlus,
  Aim,
  User
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
const userStore = useUserStore()
// const userStore = useUserStore()
</script>

<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <h3>个人中心</h3>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="/user/userinfo">
          <el-icon><Setting /></el-icon>
          <span>用户信息</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role !== 2 && userStore.userInfo.vip == 1"
          index="/user/getjob"
        >
          <el-icon><EditPen /></el-icon>
          <span>求职信息</span>
        </el-menu-item>
        <el-menu-item v-if="userStore.userInfo.role !== 2" index="/user/resume">
          <el-icon><Document /></el-icon>
          <span>我的简历</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role !== 1 && userStore.userInfo.vip == 1"
          index="/user/postjob"
        >
          <el-icon><Aim /></el-icon>
          <span>招聘信息</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role === 0"
          index="/user/personnel"
        >
          <el-icon><User /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role === 0"
          index="/user/checkGetJob"
        >
          <el-icon><ZoomIn /></el-icon>
          <span>求职审核</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role === 0"
          index="/user/checkPostJob"
        >
          <el-icon><ZoomOut /></el-icon>
          <span>招聘审核</span>
        </el-menu-item>
        <el-menu-item
          v-if="userStore.userInfo.role === 0"
          index="/user/checkVip"
        >
          <el-icon><ElementPlus /></el-icon>
          <span>会员审核</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped></style>
