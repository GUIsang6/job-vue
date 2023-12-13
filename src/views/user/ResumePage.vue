<script setup>
import { ref } from 'vue'
const resume = ref({
  name: '张三',
  age: '25',
  education: '本科',
  experience: '3年',
  photo: 'https://cdn.acdog.cn/8b6e78ed0742404d9589de76141d3a25.png',
  educationRecords: [
    { time: '2015-2019', event: 'XX大学 计算机科学与技术' },
    { time: '2019-2021', event: 'XX大学 计算机科学与技术 硕士' }
  ],
  workRecords: [{ time: '2021-至今', event: 'XX公司 软件工程师' }]
})
</script>
<template>
  <el-container>
    <el-header>
      <el-avatar :src="resume.photo" size="200"></el-avatar>
    </el-header>
    <el-main>
      <el-card class="box-card" center>
        <template v-slot:header>
          <h2>罗大壮</h2>
          <p>20岁 | 本科 | 两年半实习经验</p>
          <div class="clearfix">
            <span>教育背景</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(record, index) in resume.educationRecords"
            :key="index"
            :timestamp="record.time"
          >
            {{ record.event }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
      <el-card class="box-card">
        <template v-slot:header>
          <div class="clearfix">
            <span>工作经历</span>
          </div>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="(record, index) in resume.workRecords"
            :key="index"
            :timestamp="record.time"
          >
            {{ record.event }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #fdfdfd;
  line-height: 60px;
  padding: 10px;
  text-align: center;
}
h2 {
  margin: 0;
}
p {
  margin: 10px 0 0;
}
</style>
