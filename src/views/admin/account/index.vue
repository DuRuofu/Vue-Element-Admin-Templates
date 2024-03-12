<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<el-card class="box-card" fit="true">
		<!-- 卡片头部添加按钮 -->
		<div class="button">
			<el-button type="primary" icon="Plus">添加</el-button>
		</div>
		<!-- 卡片中部表格 -->
		<el-table border :data="tableData">
			<el-table-column align="center" label="序号" type="index"></el-table-column>
			<el-table-column align="center" label="账号" prop="Account"></el-table-column>
			<el-table-column align="center" label="头像" :width="90">
				<template #="{ row, $index }">
					<img :src="row.AvatarUrl" alt="无头像" style="width: 50px; height: 50px" />
				</template>
			</el-table-column>
			<el-table-column align="center" label="昵称" prop="Name"></el-table-column>
			<el-table-column align="center" label="邮箱" prop="Email"></el-table-column>
			<el-table-column align="center" label="手机号" prop="Phone"></el-table-column>
			<el-table-column align="center" label="角色"></el-table-column>
			<el-table-column align="center" label="操作">
				<template #="{ row, $index }">
					<el-button type="primary" size="small" icon="Edit"></el-button>
					<el-divider direction="vertical" />
					<el-button type="danger" size="small" icon="Delete"></el-button>
				</template>
			</el-table-column>
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
			:page-sizes="[10, 20, 30, 40]"
			:background="true"
			layout="prev, pager, next, jumper,->,sizes,total "
			:total="total" />
	</el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getAllAccountList } from '@/api/admin/account/index';

// 表格当前页码
const currentPage = ref<number>(1);
// 表格每页显示条目个数
const pageSize = ref<number>(10);
// 数据库数据总数
const total = ref<number>(0);
// 存储账户信息
const tableData = ref<any[]>([]);

// 获取表格数据
const getTableData = async () => {
	// 发送请求
	let result = await getAllAccountList(currentPage.value, pageSize.value);
	if (result.code === 200) {
		// 存储总数
		total.value = result.data.total;
		// 存储数据
		console.log(result.data);
		tableData.value = result.data.records;
	} else {
		ElMessage.error(result.message);
	}
};

// 组件挂载完毕
onMounted(() => {
	getTableData(); // 获取表格数据
});
</script>

<style scoped lang="scss">
// 按键样式
.button {
	margin-bottom: 10px;
}
</style>
