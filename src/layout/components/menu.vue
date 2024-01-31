<template>
	<el-menu class="el-menu" :collapse-transition="false" :collapse="isCollapse" router>
		<div class="menu-head">
			<div class="logo">
				<img src="@/assets/img/favicon.ico" alt="" />
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
		<el-sub-menu index="2">
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
</template>

<script setup lang="ts">
// 导入element-plus 图标
import { Menu as IconMenu, Setting, MoreFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';
// 导入用户仓库
//import useAccountStore from '@/stores/modules/account';
//const accountStore = useAccountStore();

// 菜单是否折叠,
const isCollapse = ref(false);
// 控制菜单折叠
const menuFold = () => {
	isCollapse.value = !isCollapse.value;
};

// 暴露方法
defineExpose({
	menuFold
});
</script>

<style scoped lang="scss">
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
		color: #fff;
		background: #001529;
	}
}

// 菜单路由样式
.el-menu {
	width: 100%;
	height: 100vh;
	background: #001529;

	.el-sub-menu {
		background: #001529;
	}

	.el-menu-item {
		color: #c3c5c8;
		background: #001529;
	}
}

// 样式穿透设置菜单字体颜色
:deep(.el-sub-menu__title) {
	color: #c3c5c8;
}

// 样式穿透设置动态样式
:deep(.el-menu-item:hover) {
	color: #fff !important;
	background: #001529 !important;
}

:deep(.el-sub-menu__title:hover) {
	color: #fff;
	background: #001529;
}

:deep(.el-sub-menu:hover) {
	background: #001529;
}
</style>
