<template>
	<div class="menu">
		<el-container>
			<el-aside class="aside" :width="isCollapse ? '64px' : '210px'">
				<el-menu class="el-menu" :collapse-transition="false" :collapse="isCollapse" router>
					<!-- 头部logo -->
					<div class="menu-head">
						<div class="logo">
							<img src="@/assets/img/favicon.ico" alt="" />
						</div>
						<div class="title" v-if="!isCollapse ? true : false">Vue-Admin</div>
					</div>
					<!-- 动态生成路由 -->
					<routemenu :menuList="accountStore.menuRoutes" ref="menuP"></routemenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<!-- 头部组件 -->
					<tabbar :isCollapse="isCollapse" :menuFold="menuFold"></tabbar>
				</el-header>
				<el-main>
					<!-- 动态部分 -->
					<router-view v-if="flag" class="router-view"></router-view>
					<!-- 动态部分 -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

// 导入菜单组件
import routemenu from './components/menu/index.vue';
// 导入tabbar组件
import tabbar from './components/tabbar/index.vue';

// 导入用户仓库
import useAccountStore from '@/stores/modules/account';
const accountStore = useAccountStore();
// 获取layout组件的数据
import useLayoutSettingStore from '@/stores/modules/layout';
const layoutSettingStore = useLayoutSettingStore();

// 控制主视图销毁
let flag = ref(true);

// 监听仓库内容发生变化
watch(
	() => layoutSettingStore.refsh,
	() => {
		// 重置flag
		flag.value = false;
		// 重新创建
		nextTick(() => {
			flag.value = true;
		});
	}
);

// 定义路由导航组件的引用
const menuP = ref();

// 控制菜单折叠
const isCollapse = ref(false);
// 菜单组件折叠方法
const menuFold = () => {
	isCollapse.value = !isCollapse.value;
};
</script>

<style scoped lang="scss">
// 菜单样式
.el-menu {
	width: 100%;
	height: 100vh;

	// background: #1d1e1f;

	// 菜单头部
	.menu-head {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 13px;

		.logo {
			align-items: center; /* 垂直居中 */
		}

		.title {
			margin-left: 10px;
			font-size: 18px;

			// 字体加粗
			font-weight: bolder;

			// color: #fff;
			// background: #001529;
		}
	}
}

.router-view {
	margin-right: 10px;
	margin-left: 10px;
}

.el-main {
	padding: 0;
	margin: 0;
}

// 去除头部默认样式
.el-header {
	padding: 0;
}
</style>
