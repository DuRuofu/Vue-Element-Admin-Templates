<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<div>
		<el-card class="box-card" fit="true">
			<!-- 卡片头部添加按钮 -->
			<div class="button">
				<el-button type="primary" icon="Plus" @click="addButton">添加角色</el-button>
			</div>
			<!-- 卡片中部表格 -->
			<el-table
				:data="tableData"
				style="width: 100%; margin-bottom: 20px"
				row-key="RoleId"
				:table-layout="tableLayout"
				border>
				<el-table-column prop="Name" label="角色名称" sortable align="center" />
				<el-table-column prop="Value" label="角色值" sortable align="center" />
				<el-table-column label="状态" sortable align="center">
					<template #default="{ row }">
						<el-tag v-if="row.IsDisabled" type="danger">禁用</el-tag>
						<el-tag v-else type="success">启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="Description" label="描述" sortable align="center" />
				<el-table-column
					prop="CreatedTime"
					label="创建时间"
					sortable
					:formatter="formatTime"
					align="center" />
				<el-table-column
					prop="UpdatedTime"
					label="更新时间"
					sortable
					:formatter="formatTime"
					align="center" />
				<el-table-column align="center" label="权限">
					<template #="{ row, $index }">
						<el-button
							type="primary"
							size="small"
							icon="Edit"
							@click="authorityButton(row)"></el-button>
					</template>
				</el-table-column>
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

		<!-- 添加角色弹窗 -->
		<el-dialog v-model="dialogVisible" :title="isAdd ? '添加角色' : '修改角色'" width="500">
			<!-- 添加组织表单 -->
			<el-form style="width: 80%">
				<el-form-item label="角色名称">
					<el-input v-model="Name" placeholder="请输入角色名称"></el-input>
				</el-form-item>
				<el-form-item label="角色值">
					<el-input v-model="Value"></el-input>
				</el-form-item>
				<el-form-item label="启用状态">
					<el-radio-group v-model="IsDisabled">
						<el-radio label="0">启用</el-radio>
						<el-radio label="1">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="角色描述">
					<el-input v-model="Description" type="textarea" placeholder="请输入角色描述"></el-input>
				</el-form-item>
			</el-form>
			<!-- 添加/修改组织表单提交 -->
			<template #footer>
				<div class="dialog-footer">
					<el-button @click="dialogVisible = false">取消</el-button>
					<el-button type="primary" @click="addOrUpdate">确认</el-button>
				</div>
			</template>
		</el-dialog>
		<!-- 忘记密码组件 -->
		<authority ref="authorityP"></authority>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getRoles, deleteRoles, addRoles, updateRoles } from '@/api/admin/role/index';
import { formatTime } from '@/utils/time';

// 引入自定义组件
import authority from './components/authority.vue';
// -----------data----------------
// 表格宽度自动适应
const tableLayout = ref('auto');
// 添加组织弹窗(显示/隐藏)
let dialogVisible = ref(false);
// 表格数据
const tableData = ref<any[]>([]);
// 添加/编辑模式标志
let isAdd = ref(true);

// 表单数据
const RoleId = ref(0);
const Name = ref('');
const Description = ref('');
const Value = ref('');
const IsDisabled = ref('0');

// 组件句柄
const authorityP = ref();

// -----------按键函数--------------
// 添加
const addButton = () => {
	dialogVisible.value = true;
	isAdd.value = true; // 设置为添加模式
	Name.value = '';
	Description.value = '';
	Value.value = '';
	IsDisabled.value = '0';
};
// 编辑
const editButton = (row: any) => {
	dialogVisible.value = true;
	isAdd.value = false; // 设置为编辑模式
	RoleId.value = row.RoleId;
	Name.value = row.Name;
	Description.value = row.Description;
	Value.value = row.Value;
	IsDisabled.value = row.IsDisabled ? '1' : '0';
};
// 删除
const deleteButton = async (row: any) => {
	// 弹窗确认
	ElMessageBox.confirm('此操作将永久删除该组织, 是否继续?', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	})
		.then(() => {
			// 删除操作
			deleteRoles(row.RoleId).then((res) => {
				if (res.code === 200) {
					ElMessage.success('删除成功');
					getTableData(); // 重新获取表格数据
				} else {
					ElMessage.error(res.message);
				}
			});
		})
		.catch(() => {
			ElMessage.info('已取消删除');
		});
};
// 添加/编辑组织表单提交
const addOrUpdate = () => {
	// 添加
	if (isAdd.value == true) {
		// 添加模式
		addRoles({
			Name: Name.value,
			Description: Description.value,
			Value: Value.value,
			IsDisabled: IsDisabled.value
		}).then((res) => {
			if (res.code === 200) {
				// 添加成功后刷新表格
				getTableData();
				// 弹窗
				ElMessage.success(res.message);
				dialogVisible.value = false;
			} else {
				// 添加失败提示
				ElMessage.error(res.message);
			}
		});
	} else {
		// 修改模式
		updateRoles(+RoleId.value, {
			Name: Name.value,
			Description: Description.value,
			Value: Value.value,
			IsDisabled: IsDisabled.value
		}).then((res) => {
			if (res.code === 200) {
				// 修改成功后刷新表格
				getTableData();
				// 弹窗
				ElMessage.success(res.message);
				dialogVisible.value = false;
			} else {
				// 修改失败提示
				ElMessage.error(res.message);
			}
		});
	}
};
// 权限
const authorityButton = (row: any) => {
	authorityP.value.open(row);
};

// ------------页面数据更新---------------
const getTableData = async () => {
	// 发送请求
	let result = await getRoles();
	if (result.code === 200) {
		// 存储数据
		tableData.value = result.data;
		console.log(result.data);
	} else {
		ElMessage.error(result.message);
	}
};

// ------------生命周期函数-------
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
