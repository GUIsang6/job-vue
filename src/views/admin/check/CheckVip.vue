<script setup>
import { UserFilled, StarFilled } from '@element-plus/icons-vue'
import { ref, onMounted } from 'vue'
import { updateUserInfoService } from '@/api/user'
import { getUserListService } from '@/api/admin'

//分页查询用户列表

const pagination = ref({
  pageNum: 1,
  pageSize: 100,
  role: '',
  fuzzySearch: ''
}) //分页参数
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
const getUserList = async () => {
  console.log(pagination.value)
  isLoading.value = true
  const res = await getUserListService(pagination.value)
  // 对用户列表进行排序，vip为2的用户在前
  userList.value = res.data.data.items.sort((a, b) => b.vip - a.vip)
  total.value = res.data.data.total
  isLoading.value = false
  console.log('用户列表:', res)
}

onMounted(async () => {
  getUserList()
})

const passButton = async (row) => {
  row.vip = 1
  console.log('通过会员', row)
  await updateUserInfoService(row)
}

//取消会员
const outButton = async (row) => {
  await ElMessageBox.confirm('将永久取消用户会员，请慎重！', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
    type: 'warning'
  })
  row.vip = 0
  console.log('取消会员', row)
  await updateUserInfoService(row)
  getUserList()
  ElMessage.success('删除成功')
}
</script>

<template>
  <el-card class="box-card" style="padding: 30px">
    <template #header>
      <div class="card-header">
        <span style="font-weight: bold">会员管理</span>
      </div>
    </template>

    <el-table :data="userList" stripe v-loading="isLoading">
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
      <el-table-column prop="state" label="状态" align="center">
        <template #default="{ row }">
          <el-tag v-if="row.vip == 1" type="success">高级会员</el-tag>
          <el-tag v-if="row.vip == 0" type="warning">普通会员</el-tag>
          <el-tag v-if="row.vip == 2" type="danger">待审核</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center">
        <template #default="{ row }">
          <el-button-group>
            <el-button
              type="success"
              size="mini"
              :icon="StarFilled"
              @click="passButton(row)"
            ></el-button>
            <el-button
              type="danger"
              size="mini"
              :icon="UserFilled"
              @click="outButton(row)"
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
