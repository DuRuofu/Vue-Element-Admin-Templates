<template>
	<el-dialog v-model="state.Dialog" title="编辑权限" width="50%">
		<div class="content">
			<el-card style="max-width: 480px">
				<template #header>
					<div class="card-header">
						<span>页面权限</span>
					</div>
				</template>
				<div>
					<el-tree-v2
						style="max-width: 600px"
						:data="PermissionData.MenuData"
						:default-checked-keys="PermissionData.defaultMenuData"
						:props="props"
						show-checkbox
						ref="refMenu"
						:height="208" />
				</div>
			</el-card>
			<el-card style="max-width: 480px">
				<template #header>
					<div class="card-header">
						<span>功能权限</span>
					</div>
				</template>
				<el-tree-v2
					style="max-width: 600px"
					:data="PermissionData.functionalData"
					:default-checked-keys="PermissionData.defaulfunctionalData"
					:props="props"
					show-checkbox
					ref="refFunction"
					:height="208" />
			</el-card>
		</div>
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="cancelButton">取消</el-button>
				<el-button type="primary" @click="updateButton">确认</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import { getMenuList } from '@/api/admin/menu/index';
import { getFunctionList } from '@/api/admin/function/index';

const refMenu = ref();
const refFunction = ref();

// 树形选框配置
const props = {
	value: 'PermissionId',
	label: 'Description',
	children: 'children',
	disabled: 'disabled'
};

const PermissionData = reactive({
	functionalData: [],
	defaulfunctionalData: [],
	currentfunctionalData: [],
	MenuData: [],
	defaultMenuData: [],
	currentMenuData: []
});
// const changes = (data: any, node: any) => {
// 	console.log(data, node);
// 	console.log(PermissionData.currentfunctionalData);
// 	console.log(PermissionData.currentMenuData);
// };

// 确认
const updateButton = () => {
	// 保存选中内容
	PermissionData.currentMenuData = refMenu.value.getCheckedKeys();
	PermissionData.currentfunctionalData = refFunction.value.getCheckedKeys();
	// 处理数据
	//state.Dialog = false;
};
// 取消
const cancelButton = () => {
	// 消息弹窗
	ElMessage.info('已取消编辑');
	state.Dialog = false;
};
// ------------页面数据更新---------------
const getTableData = async () => {
	getMenuData();
	getFunctionData();
	setDefaultData();
};

// 获取前端权限列表
const getMenuData = async () => {
	const res = await getMenuList();
	if (res.code === 200) {
		PermissionData.MenuData = res.data;
	} else {
		ElMessage.error(res.message);
	}
};

// 获取后端权限列表
const getFunctionData = async () => {
	const res = await getFunctionList();
	if (res.code === 200) {
		PermissionData.functionalData = res.data;
	} else {
		ElMessage.error(res.message);
	}
};

// 设置权限列表
const setDefaultData = () => {
	// PermissionData.defaultMenuData = PermissionData.MenuData;
	// PermissionData.defaulfunctionalData = PermissionData.functionalData;
};

// ------------生命周期函数-------
// 组件挂载完毕
onMounted(() => {
	getTableData(); // 获取表格数据
});

// -----------对外暴露方法----------------
// 包装弹窗对象
const state = reactive({
	Dialog: false
});

// 打开弹窗方法
const open = (row: any) => {
	state.Dialog = true;
	console.log('弹窗已打开');
	console.log(row);
};

// 暴露打开弹窗方法
defineExpose({
	open
});
</script>

<style scoped lang="scss">
.content {
	display: flex;
	justify-content: space-between;

	.el-card {
		width: 48%;
	}
}
</style>
