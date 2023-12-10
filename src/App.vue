<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<template>
  <div>
    <!-- App.vue只需要留一个路由出口 router-view即可 -->
    <el-config-provider :locale="zhCn">
      <NavBar></NavBar>
      <router-view></router-view>
      <el-backtop :right="100" :bottom="100" />
    </el-config-provider>
  </div>
</template>

<style scoped></style>
