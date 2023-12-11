<script setup>
import { ref, onMounted } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import {
  getPostJobListService,
  deletePostJobByIdService,
  addPostJobService,
  updatePostJobService
} from '@/api/postJob'
import { useUserStore } from '@/stores'
const {
  userInfo: { username, nickname, email, avatar, id }
} = useUserStore()
const userInfo = ref({ username, nickname, email, avatar, id })

const pagination = ref({
  pageNum: 1,
  pageSize: 100,
  userId: '',
  fuzzySearch: '',
  state: ''
}) //分页参数
const postJobList = ref([])
const getPostJobList = async () => {
  pagination.value.userId = userInfo.value.id
  const res = await getPostJobListService(pagination.value)
  postJobList.value = res.data.data.items
  console.log('招聘信息列表:', res)
}
const deletePostJob = async (row) => {
  await ElMessageBox.confirm('将永久删除该招聘信息，请慎重！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    type: 'warning'
  })
  await deletePostJobByIdService(row.id)
  getPostJobList()
  ElMessage.success('删除成功')
}

onMounted(async () => {
  getPostJobList()
})
const getJobVisible = ref(false)
const postJobform = ref({
  job: '',
  company: '',
  address: '',
  payMin: '',
  payMax: '',
  jobCategory: ''
})
//发布编辑招聘信息
const addPostJob = async () => {
  console.log('发布招聘信息:', postJobform.value)
  await addPostJobService(postJobform.value)
  getJobVisible.value = false
  getPostJobList()
  postJobform.value = {}
}
const setPostJob = async () => {
  await updatePostJobService(postJobform.value)
  getJobVisible.value = false
  getPostJobList()
  postJobform.value = {}
}
const newPostJob = () => {
  postJobform.value = {}
  console.log('新增招聘信息:', postJobform.value)
  getJobVisible.value = true
}
const editPostJob = async (row) => {
  postJobform.value = row
  getJobVisible.value = true
  console.log('编辑招聘信息:', postJobform.value.job)
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="header-title">我的招聘信息</span>
        <el-button type="primary" round style="float: right" @click="newPostJob"
          >发布招聘信息
        </el-button>
      </div>
    </template>
    <el-table :data="postJobList" stripe style="width: 100%">
      <el-table-column prop="job" label="岗位名称" align="center" width="180" />
      <el-table-column prop="address" label="地址" align="center" width="180" />
      <el-table-column label="薪资" align="center">
        <template #default="{ row }">
          {{ row.payMin }}-{{ row.payMax }}
        </template></el-table-column
      >
      <el-table-column prop="state" label="状态" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.state == 1" type="success">已发布</el-tag>
          <el-tag v-if="row.state == 2" type="warning">审核中</el-tag>
          <el-tag v-if="row.state == 0" type="danger">未通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="最近修改时间"
        show-overflow-tooltip
      />
      <el-table-column prop="address" label="操作" align="center">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              @click="editPostJob(row)"
              :icon="Edit"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              @click="deletePostJob(row)"
              :icon="Delete"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <el-dialog v-model="getJobVisible" title="招聘信息">
    <template #footer>
      <el-form :model="postJobform">
        <el-form-item label="岗位名称">
          <el-input v-model="postJobform.job"></el-input>
        </el-form-item>
        <el-form-item label="公司名称">
          <el-input v-model="postJobform.company"></el-input>
        </el-form-item>
        <el-form-item label="工作地址">
          <el-input v-model="postJobform.address"></el-input>
        </el-form-item>
        <el-form-item label="期望薪资">
          <el-row>
            <el-col :span="7">
              <el-input v-model="postJobform.payMin" placeholder="最低薪资">
              </el-input>
            </el-col>
            <el-col :span="2" style="text-align: center; font-weight: bold">
              -
            </el-col>
            <el-col :span="7">
              <el-input v-model="postJobform.payMax" placeholder="最高薪资">
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="对公司的要求">
          <el-input type="textarea" v-model="postJobform.condition"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer">
        <el-button @click="getJobVisible = false">取消</el-button>
        <el-button type="primary" @click="setPostJob()"> 编辑 </el-button>
        <el-button type="primary" @click="addPostJob()"> 添加 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped></style>
