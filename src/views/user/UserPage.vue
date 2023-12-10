<script setup>
// import { ref, onMounted } from 'vue'
// import { useUserStore } from '@/stores'
import { ChatRound } from '@element-plus/icons-vue'
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
          <el-icon><setting /></el-icon>
          <span>用户信息</span>
        </el-menu-item>
        <el-menu-item v-if="1" index="/user/getjob">
          <el-icon><ChatRound /></el-icon>
          <span>求职信息</span>
        </el-menu-item>
        <el-menu-item v-if="1" index="/user/resume">
          <el-icon><document /></el-icon>
          <span>我的简历</span>
        </el-menu-item>
        <el-menu-item v-if="2" index="/user/postjob">
          <el-icon><setting /></el-icon>
          <span>发布招聘</span>
        </el-menu-item>
        <el-menu-item v-if="1" index="/user/personnel">
          <el-icon><setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item v-if="1" index="/user/checkGetJob">
          <el-icon><setting /></el-icon>
          <span>求职审核</span>
        </el-menu-item>
        <el-menu-item v-if="1" index="/user/checkPostJob">
          <el-icon><setting /></el-icon>
          <span>招聘审核</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<style scoped></style>
