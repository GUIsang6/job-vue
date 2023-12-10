<script setup>
import { Search } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { getPostJobListService } from '@/api/postJob'
//分页查询招聘信息列表
const pagination = ref({
  pageNum: 1,
  pageSize: 5,
  userId: '',
  fuzzySearch: '',
  Category: '',
  sort: '',
  state: 1
}) //分页参数
const total = ref(0)
const postJobList = ref([])
const getPostJobList = async () => {
  console.log(pagination.value)
  const res = await getPostJobListService(pagination.value)
  postJobList.value = res.data.data.items
  total.value = res.data.data.total
  console.log('招聘信息列表:', res)
}
const sortOptions = ref([
  { label: '最新发布', value: 'latest' },
  { label: '最旧发布', value: 'oldest' },
  { label: '创建时间', value: 'most' }
]) //排序选项
const jobCategory = ref([
  { label: '前端', value: '0' },
  { label: '后端', value: '1' },
  { label: '全栈', value: '2' },
  { label: '运维', value: '3' },
  { label: '测试', value: '4' },
  { label: '产品', value: '5' },
  { label: '运营', value: '6' },
  { label: '设计', value: '7' },
  { label: '市场', value: '8' },
  { label: '销售', value: '9' },
  { label: '职能', value: '10' },
  { label: '其他', value: '11' }
])
const searchBegin = () => {
  getPostJobList()
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
  getPostJobList()
  ElMessage.success('重置成功')
}
const onCurrentChange = () => {
  getPostJobList()
  ElMessage.success('搜索成功')
}
const onSizeChange = () => {
  getPostJobList()
  ElMessage.success('搜索成功')
}
onMounted(async () => {
  getPostJobList()
})
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="header-title">招聘信息</span>
        <router-link to="/user/postjob">
          <el-button type="success" @click="$router.push('/user/postjob')"
            >我也要招聘
          </el-button>
        </router-link>
      </div>
    </template>
    <el-form inline v-model="pagination">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="职业类别" class="vertical-center">
            <el-select
              v-model="pagination.Category"
              class="m-2"
              placeholder="请选择"
            >
              <el-option
                v-for="item in jobCategory"
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
    <el-card class="job-card" v-for="item in postJobList" :key="item.id">
      <el-row :gutter="20">
        <el-col :span="15">
          <h2 class="job-title">{{ item.job }}</h2>
          <p class="job-requirements">{{ item.condition }}</p>
          <el-tag>{{ item.payMin }} - {{ item.payMax }}</el-tag>
        </el-col>
        <el-col :span="6">
          <p class="job-company">{{ item.company }}</p>

          <p class="job-location">{{ item.address }}</p>
          <p class="job-publish-time">{{ item.createTime }}</p>
        </el-col>
      </el-row>
    </el-card>
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

<style lang="scss" scoped>
.header-title {
  font-size: 28px;
  font-weight: bold;
  color: rgb(36, 74, 161);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.job-card {
  margin-bottom: 20px;
  padding: 10px;
  border: 2px solid #03786e;
}
.job-company,
.job-title {
  font-size: 20px;
  font-weight: bold;
}
.job-company,
.job-location,
.job-publish-time,
.job-requirements {
  margin-top: 10px;
}
.box-card {
  margin-top: 20px;
  margin-left: 150px;
  margin-right: 150px;
  padding: 30px;
}
</style>
