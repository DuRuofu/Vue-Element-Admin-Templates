<template>
  <div class="menu">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '210px'" class="aside">
        <el-menu class="el-menu" :collapse-transition="false" :collapse="isCollapse" router>
          <div class="menu-head">
            <div class="logo">
              <img src="../../assets/img/favicon.ico" alt="" />
            </div>
            <div class="title" v-if="!isCollapse ? true : false">Vue-Admin</div>
          </div>

          <el-sub-menu index="home">
            <template #title>
              <el-icon><icon-menu /></el-icon>
              <span>Dashboard</span>
            </template>
            <el-menu-item index="home">数据概览</el-menu-item>
            <el-menu-item index="1-2">工作台</el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="1-1">账户管理</el-menu-item>
            <el-menu-item index="1-2">角色管理</el-menu-item>
            <el-menu-item index="1-3">功能管理</el-menu-item>
            <el-menu-item index="1-3">菜单管理</el-menu-item>
            <el-menu-item index="1-3">组织管理</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="about">
            <el-icon><MoreFilled /></el-icon>
            <span>关于</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header-left">
            <el-button
              class="menu-fold-button"
              @click="menuFold"
              :icon="!isCollapse ? DArrowLeft : DArrowRight"
            />
          </div>
          <div class="header-right">
            <!-- 全屏 -->
            <el-icon class="fullscreen"><FullScreen /></el-icon>
            <!-- 消息 -->
            <el-icon class="messamge"><Message /></el-icon>
            <!-- 头像 -->
            <el-avatar :size="24" :src="circleUrl" />
            <!-- 下拉框 -->
            <el-dropdown>
              <span class="el-dropdown-link">
                Vue-Admin
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>文档 </el-dropdown-item>
                  <el-dropdown-item>代码仓库</el-dropdown-item>
                  <el-dropdown-item @click="goLogin">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 设置 -->
            <el-icon class="setting"><Setting /></el-icon>
          </div>
        </el-header>
        <el-main>
          <!-- 动态部分 -->
          <router-view></router-view>
          <!-- 动态部分 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'
// 导入element-plus 图标
import {
  Menu as IconMenu,
  Setting,
  MoreFilled,
  DArrowLeft,
  DArrowRight,
  FullScreen,
  Message,
  ArrowDown
} from '@element-plus/icons-vue'

const router = useRouter()
// 菜单是否折叠,
const isCollapse = ref(false)

const menuFold = () => {
  isCollapse.value = !isCollapse.value
}

const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})

const { circleUrl } = toRefs(state)

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped lang="scss">
// 菜单样式
.aside {
  height: 100vh;
  background: #001529;
  .el-menu {
    background: #001529;

    .el-sub-menu {
      background: #001529;
    }

    .el-menu-item {
      background: #001529;
      color: #c3c5c8;
    }
  }

  // 菜单头部
  .menu-head {
    height: 40px;
    display: flex;
    padding: 13px;
    align-items: center;
    .logo {
      margin: auto 0;
      align-items: center; /* 垂直居中 */
    }
    .title {
      color: #fff;
      background: #001529;
      margin-left: 10px;
      font-size: 18px;
      align-items: center; /* 垂直居中 */
      // 字体加粗
      font-weight: bolder;
    }
  }
}

// 头部样式
.el-header {
  height: 48px;
  width: 100%;
  background: #fff;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0 5px 1px #c2bebe;
  .menu-fold-button {
    width: 20px;
    height: 48px;
    float: left;
    border: none;
  }

  .header-right {
    display: flex;
    align-items: center;
    .fullscreen {
      margin-right: 20px;
    }
    .messamge {
      margin-right: 20px;
    }
    .el-avatar {
      margin-right: 20px;
    }
    .el-dropdown {
      margin-right: 8px;
    }
    // 去除下拉框焦点轮廓
    .el-dropdown,
    .el-dropdown * {
      outline: none;
    }
    .setting {
      margin-right: 10px;
    }
  }
}

// 样式穿透设置菜单字体颜色
:deep(.el-sub-menu__title) {
  color: #c3c5c8;
}

//样式穿透设置动态样式
:deep(.el-menu-item:hover) {
  background: #001529 !important;
  color: #fff !important;
}
:deep(.el-sub-menu__title:hover) {
  background: #001529;
  color: #fff;
}
:deep(.el-sub-menu:hover) {
  background: #001529;
}
</style>
