<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<el-card class="box-card" fit="true">
		<!-- 卡片头部添加按钮 -->
		<div class="button">
			<el-button type="danger" icon="CircleCloseFilled" @click="resetButton">重置菜单</el-button>
		</div>
		<!-- 卡片中部表格 -->
		<el-table
			:data="tableData"
			style="width: 100%; margin-bottom: 20px"
			row-key="PermissionId"
			:table-layout="tableLayout"
			border>
			<el-table-column prop="Name" label="菜单名称" sortable />
			<el-table-column prop="Description" label="描述" sortable align="center" />
			<el-table-column label="状态" sortable align="center">
				<template #default="{ row }">
					<el-tag v-if="row.IsDisabled" type="danger">禁用</el-tag>
					<el-tag v-else type="success">启用</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="RuleValue" label="路由值" sortable />
			<el-table-column label="方法" sortable align="center">
				<template #default="{ row }">
					<el-tag v-if="row.Action == '*'" type="primary">全部</el-tag>
					<el-tag v-if="row.Action == 'get'" type="success">get</el-tag>
					<el-tag v-if="row.Action == 'post'" type="info">post</el-tag>
					<el-tag v-if="row.Action == 'put'" type="warning">put</el-tag>
					<el-tag v-if="row.Action == 'delete'" type="danger">delete</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="CreatedTime"
				label="创建时间"
				sortable
				:formatter="formatTime"
				align="center" />
			<el-table-column align="center" label="操作" fixed="right">
				<template #="{ row, $index }">
					<el-button type="primary" size="small" icon="Edit" @click="editButton(row)"></el-button>
					<el-divider direction="vertical" />
					<el-button
						type="danger"
						size="small"
						icon="Delete"
						@click="deleteButton(row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 卡片底部分页-->
	</el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { formatTime } from '@/utils/time';
import { getMenuList, putMenuList, deleteMenu } from '@/api/admin/menu/index';
// 表格宽度自动适应
const tableLayout = ref('auto');
// 表格数据
const tableData = ref<any[]>([]);

// 操作按钮
const resetButton = () => {
	// 确认弹窗
	ElMessageBox.confirm('此操作将重置所有权限, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			const res = await putMenuList();
			if (res.code === 200) {
				// 刷新数据
				getTableData();
				// 弹窗
				ElMessage.success('重置成功');
			} else {
				ElMessage.error('重置失败');
			}
		})
		.catch(() => {
			ElMessage('已取消重置');
		});
};

const editButton = (row: any) => {
	ElMessage('编辑功能');
	console.log(row);
};

const deleteButton = (row: any) => {
	console.log(row);
	ElMessageBox.confirm('此操作将永久删除该组织, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(async () => {
			const res = await deleteMenu(row.PermissionId);
			if (res.code === 200) {
				// 刷新数据
				getTableData();
				// 弹窗
				ElMessage.success('删除成功');
			} else {
				ElMessage.error('删除失败');
			}
		})
		.catch(() => {
			ElMessage('已取消删除');
		});
};

// 更新页面数据
const getTableData = async () => {
	// 发送请求
	const res = await getMenuList();
	console.log(res);
	if (res.code === 200) {
		// 表格数据赋值
		console.log(res.data);
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
