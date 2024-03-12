<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<el-card class="box-card" fit="true">
		<!-- 卡片头部添加按钮 -->
		<div class="button">
			<el-button type="primary" icon="Plus" @click="addButton">添加组织</el-button>
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
					<el-button type="primary" size="small" icon="Edit" @click="editButton"></el-button>
					<el-divider direction="vertical" />
					<el-button type="danger" size="small" icon="Delete"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 卡片底部分页-->
	</el-card>

	<!-- 添加组织弹窗 -->
	<el-dialog v-model="addOrgDialogVisible" :title="isAdd ? '添加组织' : '修改组织'" width="500">
		<!-- 添加组织表单 -->
		<el-form style="width: 80%">
			<el-form-item label="组织名称">
				<el-input v-model="Name" placeholder="请输入组织名称"></el-input>
			</el-form-item>
			<el-form-item label="上级部门">
				<el-cascader
					v-model="Parent"
					:options="options"
					:props="{ checkStrictly: true }"
					:show-all-levels="false"
					@change="handleChange"
					clearable />
			</el-form-item>
			<el-form-item label="所属层级">
				<el-input v-model="LevelName" disabled></el-input>
			</el-form-item>
			<el-form-item label="启用状态">
				<el-radio-group v-model="ISDisabled">
					<el-radio label="0">启用</el-radio>
					<el-radio label="1">禁用</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="组织描述">
				<el-input v-model="Description" type="textarea" placeholder="请输入组织描述"></el-input>
			</el-form-item>
		</el-form>
		<!-- 添加/修改组织表单提交 -->
		<template #footer>
			<div class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="addOrUpdateOrg">确认</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import {
	getOrganizationTrees,
	addOrganization,
	updateOrganization
} from '@/api/admin/organization';

// 表格数据
const tableData = ref<any[]>([]);

// 层级定义(可定义多层)
const levelOptions = [
	{ LevelName: '学校', Level: 0 },
	{ LevelName: '学院', Level: 1 },
	{ LevelName: '专业', Level: 2 },
	{ LevelName: '班级', Level: 3 }
];

// 添加组织弹窗(显示/隐藏)
let addOrgDialogVisible = ref(false);

// 添加/编辑组织表单数据
const OrganizationId = ref('');
const Name = ref('');
const Description = ref('1');
const Level = ref('0');
const LevelName = ref('');
const ISDisabled = ref('0');
const ParentId = ref('');

// 添加/编辑模式标志
let isAdd = ref(true);

// 上级组织选框选项数据
const options = ref<any[]>([]);
// 选框数据
const Parent = ref('');

// 上级组织选框数据更新
const handleChange = () => {
	console.log(Parent.value);
	// 获取父级ID
	const maxIndex = Math.max(...Object.keys(Parent.value));
	ParentId.value = Parent.value[maxIndex];
	// 计算自身层级
	Level.value = maxIndex + 1;
	// 更新层级名称
	LevelName.value = levelOptions[Level.value].LevelName;
};

/**
 * 更新框选类型数据格式，并控制层级深度
 * @param {Array} data - 原始数据数组
 * @param {number} maxLevel - 最大层级深度
 * @param {number} currentLevel - 当前处理的层级，默认为0
 * @returns {Array} - 更新后的数据数组
 */
const updateSelectType = (data, maxLevel, currentLevel = 1) => {
	// 遍历data，返回新的item，并判断是否有子节点，有子节点则继续递归调用
	return data.map((item) => {
		const newItem = {
			value: item.OrganizationId,
			label: item.Name
		};
		if (item.children && currentLevel < maxLevel - 1) {
			// 检查是否有子节点且当前层级未达到最大层级减一
			newItem.children = updateSelectType(item.children, maxLevel, currentLevel + 1); // 递归调用，并将当前层级加一
		}
		return newItem;
	});
};

const addButton = () => {
	addOrgDialogVisible.value = true;
	isAdd.value = true; // 设置为添加模式
	// 清空表单
	Name.value = '';
	Description.value = '';
	Level.value = 1;
	LevelName.value = '';
	Parent.value = {};
	ParentId.value = 0;
};

const editButton = () => {
	addOrgDialogVisible.value = true;
	isAdd.value = false; // 设置为编辑模式
	// 填充表单
	// OrganizationId.value = currentOrg.value.OrganizationId;
};

// 添加/修改组织
const addOrUpdateOrg = async () => {
	if (isAdd.value == true) {
		// 添加模式
		const res = await addOrganization({
			Name: Name.value,
			Description: Description.value,
			Level: Level.value,
			LevelName: LevelName.value,
			ParentId: ParentId.value,
			ISDisabled: ISDisabled.value
		});
		console.log(res);
		if (res.code === 200) {
			// 添加成功后刷新表格
			getTableData();
			// 弹窗
			ElMessage.success(res.msg);
			addOrgDialogVisible.value = false;
		} else {
			// 添加失败提示
			ElMessage.error(res.msg);
		}
	} else {
		// 修改模式
		const res = await updateOrganization({
			Id: OrganizationId.value,
			Name: Name.value,
			Description: Description.value,
			Level: Level.value,
			LevelName: LevelName.value,
			ParentId: ParentId.value,
			ISDisabled: ISDisabled.value
		});
		console.log(res);
		if (res.code === 200) {
			// 修改成功后刷新表格
			getTableData();
			// 弹窗
			ElMessage.success(res.msg);
			addOrgDialogVisible.value = false;
		} else {
			// 修改失败提示
			ElMessage.error(res.msg);
		}
	}
};

// 更新页面数据
const getTableData = async () => {
	// 发送请求
	const res = await getOrganizationTrees();
	console.log(res);
	if (res.code === 200) {
		// 表格数据赋值
		tableData.value = res.data;
		// 修改/更新框选型更新(最后一级不展示，控制深度)
		options.value = updateSelectType(tableData.value, levelOptions.length);
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
