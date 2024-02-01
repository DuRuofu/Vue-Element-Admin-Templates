<template>
	<!-- 遍历生成路由 -->
	<template v-for="item in menuList" :key="item.path">
		<!-- 无子页面 -->
		<el-menu-item v-if="!item.children && !item.meta.hidden" :index="item.path">
			<el-icon>
				<component :is="item.meta.icon" />
			</el-icon>
			<template #title>
				<span>{{ item.meta.title }}</span>
			</template>
		</el-menu-item>
		<!-- 只有一个子页面 -->
		<el-menu-item
			v-if="item.children && item.children.length == 1 && !item.children[0].meta.hidden"
			:index="item.children[0].path">
			<el-icon><component :is="item.children[0].meta.icon" /></el-icon>
			<template #title>
				<span>{{ item.children[0].meta.title }}</span>
			</template>
		</el-menu-item>
		<!-- 有多个子页面 -->
		<el-sub-menu
			v-if="item.children && item.children.length > 1 && !item.meta.hidden"
			:index="item.path">
			<template #title>
				<el-icon><component :is="item.meta.icon" /></el-icon>
				<span>{{ item.meta.title }}</span>
			</template>
			<!-- 递归调用 -->
			<routemenu :menuList="item.children"></routemenu>
		</el-sub-menu>
	</template>
</template>

<script setup name="routemenu" lang="ts">
// 获取父组件数据
defineProps(['menuList']);
</script>

<script lang="ts">
export default {
	name: 'routemenu'
};
</script>
<style scoped lang="scss">
// .el-sub-menu {
// 	//background: #1d1e1f;
// }

// .el-menu-item {
// 	//color: #c3c5c8;
// 	//background: #1d1e1f;
// }

// // 样式穿透设置菜单字体颜色
// :deep(.el-sub-menu__title) {
// 	//color: #c3c5c8;
// }

// // 样式穿透设置动态样式
// :deep(.el-menu-item:hover) {
// 	//color: #fff !important;
// 	//background: #121212 !important;
// }

// :deep(.el-sub-menu__title:hover) {
// 	//color: #fff;
// 	//background: #121212;
// }

// :deep(.el-sub-menu:hover) {
// 	//background: #121212;
// }
</style>
