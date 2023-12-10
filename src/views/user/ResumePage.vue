<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const resumeList = ref([
  {
    name: '张三',
    age: '25',
    education: '本科',
    experience: '3年'
  }
])
</script>

<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true" style="float: right"
      >编辑
    </el-button>
    <el-table :data="resumeList" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="education" label="教育"></el-table-column>
      <el-table-column prop="experience" label="经验"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
