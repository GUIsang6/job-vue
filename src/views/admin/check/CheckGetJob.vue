<script setup>
import { Search, CloseBold, Select } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getJobListService } from '@/api/getJob'
import { checkGetJobService } from '@/api/admin'
//分页查询求职信息列表
const pagination = ref({
  pageNum: 1,
  pageSize: 5,
  userId: '',
  fuzzySearch: '',
  Category: '',
  sort: '',
  state: ''
}) //分页参数
const total = ref(0)
const postJobList = ref([])
const getJobList = async () => {
  const res = await getJobListService(pagination.value)
  postJobList.value = res.data.data.items
  total.value = res.data.data.total
  console.log('求职信息列表:', res)
}
const sortOptions = ref([
  { label: '最新发布', value: 'latest' },
  { label: '最旧发布', value: 'oldest' },
  { label: '创建时间', value: 'most' }
]) //排序选项
const jobState = ref([
  { value: '0', label: '未通过' },
  { value: '1', label: '已发布' },
  { value: '2', label: '待审核' },
  { value: '', label: '所有' }
]) //角色选项
const searchBegin = () => {
  getJobList()
  ElMessage.success('搜索成功')
}
//重置搜索
const resetSearch = () => {
  pagination.value = {
    pageNum: 1,
    pageSize: 5,
    userId: '',
    fuzzySearch: '',
    Category: '',
    sort: ''
  }
  getJobList()
  ElMessage.success('重置成功')
}
const onCurrentChange = () => {
  getJobList()
  ElMessage.success('搜索成功')
}
const onSizeChange = () => {
  getJobList()
  ElMessage.success('搜索成功')
}
onMounted(async () => {
  getJobList()
})
const passGetJob = async (row) => {
  row.state = 1
  await checkGetJobService(row)
  getJobList()
  ElMessage.success('审核通过')
}
const closeGetJob = async (row) => {
  row.state = 0
  await checkGetJobService(row)
  getJobList()
  ElMessage.error('审核不通过')
}
</script>

<template>
  <el-card class="box-card" style="padding: 20px">
    <template #header>
      <div class="card-header">
        <h2 style="text-align: center; margin-top: auto; margin-bottom: auto">
          求职信息审核
        </h2>
      </div>
    </template>
    <el-form inline v-model="pagination">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="用户角色" class="vertical-center">
            <el-select
              v-model="pagination.role"
              class="m-2"
              placeholder="请选择"
            >
              <el-option
                v-for="item in jobState"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-input
              v-model="pagination.fuzzySearch"
              class="w-50 m-2"
              placeholder="搜索职位、公司"
              :suffix-icon="Search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序方式">
            <el-select
              v-model="pagination.sort"
              class="m-2"
              placeholder="最新发布"
            >
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" :icon="Search" @click="searchBegin()"
              >搜索
            </el-button>
            <el-button type="info" plain @click="resetSearch()">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider style="margin-top: 0"></el-divider>
    <el-table :data="postJobList" stripe style="width: 100%">
      <el-table-column prop="job" label="岗位名称" align="center" width="180" />
      <el-table-column
        prop="address"
        label="期望工作地点"
        align="center"
        width="180"
      />
      <el-table-column label="期望薪资" align="center">
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
              type="success"
              size="mini"
              @click="passGetJob(row)"
              :icon="Select"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              @click="closeGetJob(row)"
              :icon="CloseBold"
            ></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="pagination.pageNum"
        v-model:page-size="pagination.pageSize"
        :page-sizes="[3, 5, 10, 20, 50]"
        layout="prev, pager, next"
        :total="total"
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        style="justify-content: center; margin-bottom: -25px"
      />
    </template>
  </el-card>
</template>

<style scoped></style>
