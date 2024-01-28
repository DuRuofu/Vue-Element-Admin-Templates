<template>
  <!-- 找回密码 -->
  <el-dialog v-model="state.fogetPasswordDialog" title="找回密码" width="30%">
    <el-form class="register-form" :rules="rules">
      <el-form-item label="账户" prop="Account">
        <el-input v-model="formData.Account" placeholder="请输入您的账户" />
      </el-form-item>
      <el-form-item label="邮箱" prop="Email_Phone">
        <el-input v-model="formData.Email_Phone" placeholder="请输入邮箱或手机号" />
      </el-form-item>
    </el-form>
    <!-- 底部内容 -->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.fogetPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="openUpdataPassword"> 下一步 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

// const fogetPasswordDialog = ref(false)

interface FormData {
  Account: string
  Email_Phone: string
}
// 定义表单数据
const formData: FormData = reactive({
  Account: '',
  Email_Phone: ''
})

// 定义表单验证规则
const rules = reactive({
  Account: [{ required: true, message: '请输入您的注册账户', trigger: 'blur' }],
  Email_Phone: [{ required: true, message: '请输入您的邮箱或密码', trigger: 'blur' }]
})

// 包装弹窗对象
const state = reactive({
  fogetPasswordDialog: false
})

// 打开弹窗方法
const open = () => {
  state.fogetPasswordDialog = true
  console.log('弹窗已打开')
  console.log(state.fogetPasswordDialog)
}

// 打开更新密码弹窗
const openUpdataPassword = () => {}
// 暴露打开弹窗方法
defineExpose({
  open
})
</script>

<style scoped lang="scss"></style>
