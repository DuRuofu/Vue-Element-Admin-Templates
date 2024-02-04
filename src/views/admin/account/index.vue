<template>
	<el-card class="box-card">
		<!-- 卡片头部添加按钮 -->
		<div>
			<el-button type="primary" icon="Plus">添加品牌</el-button>
		</div>
		<!-- 卡片中部表格 -->
		<el-table border>
			<el-table-column align="center" label="序号"></el-table-column>
			<el-table-column align="center" label="账号"></el-table-column>
			<el-table-column align="center" label="昵称"></el-table-column>
			<el-table-column align="center" label="邮箱"></el-table-column>
			<el-table-column align="center" label="手机号"></el-table-column>
			<el-table-column align="center" label="角色"></el-table-column>
			<el-table-column align="center" label="操作"></el-table-column>
		</el-table>
		<!-- 卡片底部分页
			v-model:current-page:当前页数
			v-model:page-size :每页显示条目个数
			:page-sizes:每页显示个数选择器的选项设置
			:background:是否为分页按钮添加背景色
			layout:组件布局，子组件名用逗号
		-->
		<el-pagination
			v-model:current-page="currentPage"
			v-model:page-size="pageSize"
			:page-sizes="[50, 100, 150, 200]"
			:background="true"
			layout="prev, pager, next, jumper,->,sizes,total "
			:total="400" />
	</el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 表格当前页码
const currentPage = ref<number>(1);
const pageSize = ref<number>(100);
</script>

<style scoped lang="scss"></style>
