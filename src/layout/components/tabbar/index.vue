<template>
	<div class="header">
		<div class="header-left">
			<!-- 折叠导航栏按键 -->
			<el-button class="menu-fold-button" @click="menuFold">
				<el-icon :size="18">
					<Expand v-if="isCollapse" />
					<Fold v-if="!isCollapse" />
				</el-icon>
			</el-button>
			<!-- 面包屑组件 -->
			<div class="breadcrumb">
				<breadcrumb></breadcrumb>
			</div>
		</div>
		<div class="header-right">
			<setting></setting>
		</div>
	</div>
</template>

<script setup lang="ts">
// 导入element-plus 图标
import { Expand, Fold } from '@element-plus/icons-vue';

// 导入面包屑组件
import breadcrumb from './components/breadcrumb.vue';
// 导入设置组件
import setting from './components/setting.vue';

// 获取父组件数据
defineProps(['isCollapse', 'menuFold']);
</script>
<script lang="ts">
export default {
	name: 'tabbar'
};
</script>
<style scoped lang="scss">
// 头部样式
.header {
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 48px;
	padding: 0;
	box-shadow: 0 3px 5px -5px #c2bebe;

	.menu-fold-button {
		display: flex;
		float: left;
		width: 20px;
		height: 48px;
		border: none;
	}

	.breadcrumb {
		display: flex;
		align-items: center;
		float: left;
		height: 100%;
		margin-left: 10px;
		font-size: 20px;
	}

	.header-right {
		display: flex;
		align-items: center;
		height: 100%;
	}
}
</style>
