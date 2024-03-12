<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<el-card class="box-card" fit="true">
		<!-- 卡片头部添加按钮 -->
		<div class="button">
			<el-button type="primary" icon="Plus">添加组织</el-button>
		</div>
		<!-- 卡片中部表格 -->
		<el-table
			:data="tableData"
			style="width: 100%; margin-bottom: 20px"
			row-key="OrganizationId"
			border>
			<el-table-column prop="Name" label="组织名称" sortable />
			<el-table-column prop="LevelName" label="层级名称" sortable />
			<el-table-column prop="Description" label="描述" sortable />
			<el-table-column prop="CreatedTime" label="创建时间" sortable />
			<el-table-column align="center" label="操作">
				<template #="{ row, $index }">
					<el-button type="primary" size="small" icon="Edit"></el-button>
					<el-divider direction="vertical" />
					<el-button type="danger" size="small" icon="Delete"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 卡片底部分页-->
	</el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getOrganizationTrees } from '@/api/admin/organization';

// 表格数据
const tableData = ref<any[]>([]);

// 层级定义(可定义多层)
// const levelOptions = [
// 	{ LevelName: '组织', Level: 0 },
// 	{ LevelName: '团队', Level: 1 }
// ];

// 获取表格数据
const getTableData = async () => {
	// 发送请求
	const res = await getOrganizationTrees();
	console.log(res);
	if (res.code === 200) {
		// 表格数据赋值
		tableData.value = res.data;
	} else {
		ElMessage.error(res.msg);
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
