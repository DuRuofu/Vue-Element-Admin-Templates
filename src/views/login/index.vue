<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header-wrapped">
        <div class="header-content">
          <h3>Vue-Element-Admin-Template</h3>
        </div>
      </el-header>
      <el-main>
        <div class="main-wrapped">
          <div class="main-content">
            <el-card class="box-card">
              <template #header>
                <div class="card-header">
                  <span class="title">登陆</span>
                </div>
              </template>
              <el-form :model="form">
                <el-form-item label="账号">
                  <el-input v-model="form.account" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="form.password" />
                </el-form-item>
              </el-form>
              <template #footer>
                <el-button class="button" text> 登陆 </el-button>
              </template>
            </el-card>
          </div>
        </div>
      </el-main>
      <el-footer class="footer-wrapped">
        <div class="footer-content">
          <h3>Vue-Element-Admin-Template@DuRuofu</h3>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
const form = reactive({
  account: '',
  password: ''
})
</script>

<style scoped lang="scss">
// 头部
.header-wrapped {
  width: 100%;
  background-color: #76abdf;
  color: #fff;
  margin: 0 auto;
  .header-content {
    margin: 0 100px;
  }
}

// 中部
.el-main {
  background-image: url(../../assets/login.jpg);
  width: 100%;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  .main-wrapped {
    .main-content {
      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 30px;
      }

      .box-card {
        width: 350px;
      }
    }
  }
}

// 底部
.footer-wrapped {
  background-color: #6ca4dc;
  width: 100%;
  height: 100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  .footer-content {
    margin: 0 auto;
  }
}
</style>
