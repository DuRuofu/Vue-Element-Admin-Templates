<template>
  <div class="layout">
    <el-container>
      <el-aside class="aside">
        <div class="logo">
          <img src="../../assets/img/login-box.svg" alt="" />
        </div>
        <div class="title">Vue-Element-Admin-Template</div>
        <div class="title">开箱即用的后端管理模板</div>
      </el-aside>
      <el-main class="main">
        <el-card class="box-card">
          <div class="main-title-1">Vue-Element-Admin</div>
          <div class="main-title-2">一个简单易用的后台管理系统</div>
          <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
            <el-tab-pane label="登陆" name="first">
              <el-form class="login-form">
                <el-form-item label="账户:">
                  <el-input v-model="loginData.Account" placeholder="请输入账户" />
                </el-form-item>
                <el-form-item label="密码">
                  <el-input v-model="loginData.Password" placeholder="请输入密码" />
                </el-form-item>
                <div class="login-bottom">
                  <div>
                    <span class="forget-passord-button">忘记密码?</span>
                  </div>
                  <div>
                    <el-button class="login-button" type="primary" @click="login">登陆</el-button>
                  </div>
                  <div class="go-register">
                    还没有账户?
                    <span class="go-register-button">立即注册</span>
                  </div>
                </div>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="注册" name="second">注册</el-tab-pane>
          </el-tabs>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const activeName = ref('first')

import { reactive } from 'vue'

// 定义数据接口
interface LoginData {
  Account: string
  Password: string
}

// 定义登陆表单数据
const loginData: LoginData = reactive({
  Account: '',
  Password: ''
})

// 定义登陆方法
const login = () => {}
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100vh;

  // 侧面
  .aside {
    background: linear-gradient(135deg, #6078ea, #17ead9);
    width: 40%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // 阴影
    position: relative;
    box-shadow: 0 0 5px 1px #999;
    // 圆角
    border-radius: 1%;

    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 65%;
      height: 65%;
      margin-top: -160px;
    }
    .title {
      margin-top: 15px;
      color: #ffffff;
      font-size: 30px;
    }
  }

  // 主内容
  .main {
    background-color: #ffffff;
    width: 60%;
    height: 100vh;
    // 强制去除原有padding，使el-aside和el-main贴合
    padding: 0 !important;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .main-title-1 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      margin-bottom: 10px;

      font-size: 25px;
      font-weight: bold;
    }
    .main-title-2 {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 2px;
      margin-bottom: 2px;

      font-size: 13px;
      color: #7a7373;
    }
    .box-card {
      height: 70%;
      width: 430px;

      // 登陆表单
      .login-form {
        width: 80%;
        margin: 0 auto;
        .el-form-item {
          margin: 20px auto;
        }

        // 底部外壳
        .login-bottom {
          width: 100%;
          .forget-passord-button {
            float: right;
            margin-right: 10px;
            margin-top: -5px;
            margin-bottom: 10px;
            font-size: 13px;
            color: #0960bd;
          }
          .login-button {
            height: 36px;
            width: 100%;
            margin-bottom: 10px;
          }

          .go-register {
            margin: auto 0;
            font-size: 13px;
            display: flex;
            justify-content: center; /* 水平居中 */

            .go-register-button {
              margin-left: 5px;
              color: #0960bd;
            }
          }
        }
      }
    }
  }
}
</style>

<!-- <template>
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
</style> -->
