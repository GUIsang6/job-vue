<script setup>
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import {
  getUserListService,
  createUserService,
  deleteUserByIdService
} from '@/api/admin'

//分页查询用户列表
const roleOptions = ref([
  { value: '0', label: '管理员' },
  { value: '1', label: '求职者' },
  { value: '2', label: '招聘者' },
  { value: '', label: '所有用户' }
]) //角色选项
const sortOptions = ref([
  { label: '最新发布', value: 'latest' },
  { label: '最旧发布', value: 'oldest' },
  { label: '创建时间', value: 'most' }
]) //排序选项
const pagination = ref({
  pageNum: 1,
  pageSize: 10,
  role: '',
  fuzzySearch: ''
}) //分页参数
const searchBegin = () => {
  getUserList()
  ElMessage.success('搜索成功')
}
const onCurrentChange = () => {
  getUserList()
  ElMessage.success('搜索成功')
}
const onSizeChange = () => {
  getUserList()
  ElMessage.success('搜索成功')
}
const total = ref(0)
const isLoading = ref(false)
//获取用户列表
const userList = ref([])
const formatRole = (row) => {
  const role = row.role
  switch (role) {
    case 0:
      return '管理员'
    case 1:
      return '求职者'
    case 2:
      return '招聘者'
    default:
      return '未知角色'
  }
}
const getUserList = async () => {
  console.log(pagination.value)
  isLoading.value = true
  const res = await getUserListService(pagination.value)
  userList.value = res.data.data.items
  total.value = res.data.data.total
  isLoading.value = false
  console.log('用户列表:', res)
}
//重置搜索
const resetSearch = () => {
  pagination.value = {
    pageNum: 1,
    pageSize: 10,
    role: '',
    fuzzySearch: ''
  }
  getUserList()
  ElMessage.success('重置成功')
}

onMounted(async () => {
  getUserList()
})

//添加用户
const addUserDialog = ref(false)
const addUserButton = () => {
  editUser.value = {}
  addUserDialog.value = true
}
const editUserButton = (row) => {
  editUser.value = row
  console.log(editUser.value)
  addUserDialog.value = true
}
const addUser = async () => {
  const res = await createUserService(editUser.value)
  addUserDialog.value = false
  if (editUser.value.username) {
    ElMessage.success('编辑成功')
  } else {
    ElMessage.success('添加成功')
  }
  editUser.value = {}
  console.log(res)
}

const editUser = ref({
  username: '',
  role: []
})
//删除用户
const deleteUser = async (id) => {
  await ElMessageBox.confirm('将永久删除该用户，请慎重！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    type: 'warning'
  })
  await deleteUserByIdService(id)
  getUserList()
  ElMessage.success('删除成功')
}
</script>

<template>
  <el-card class="box-card" style="padding: 30px">
    <template #header>
      <div class="card-header">
        <span style="font-weight: bold">用户管理</span>
        <el-button
          class="button"
          type="success"
          @click="addUserButton()"
          style="float: right"
          >添加用户
        </el-button>
      </div>
    </template>
    <el-form inline :model="searchUser">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="用户昵称">
            <el-input
              v-model="pagination.fuzzySearch"
              class="w-50 m-2"
              placeholder="请输入用户昵称"
              :suffix-icon="Search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="用户角色" class="vertical-center">
            <el-select
              v-model="pagination.role"
              class="m-2"
              placeholder="请选择"
            >
              <el-option
                v-for="item in roleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="排序方式">
            <el-select v-model="value" class="m-2" placeholder="最新发布">
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
    <el-table :data="userList" stripe v-loading="isLoading">
      <el-table-column
        type="selection"
        width="100"
        align="center"
      ></el-table-column>
      <el-table-column
        width="80"
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="用户昵称"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="role"
        label="角色"
        align="center"
        :formatter="formatRole"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建日期"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              :icon="Edit"
              @click="editUserButton(row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              :icon="Delete"
              @click="deleteUser(row.id)"
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
    <el-dialog
      v-model="addUserDialog"
      :title="editUser.username ? '编辑用户' : '添加用户'"
      width="30%"
      :before-close="handleClose"
      center
    >
      <el-form :model="editUser" label-width="120px" label-position="top">
        <el-form-item label="用户名">
          <el-input v-model="editUser.username"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="editUser.role">
            <el-option label="求职者" :value="1"></el-option>
            <el-option label="招聘者" :value="2"></el-option>
            <el-option disabled label="管理员" :value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addUserDialog = false">取消</el-button>
          <el-button type="primary" @click="addUser()">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<style scoped></style>
