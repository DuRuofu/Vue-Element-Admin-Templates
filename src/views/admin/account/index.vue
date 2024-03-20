<!-- eslint-disable vue/valid-attribute-name -->
<template>
	<div class="box-card">
		<el-card style="width: 100%; margin: 0 0 10px" class="screen">
			<div class="input">
				组织:
				<el-tree-select
					v-model="organizationValue"
					:data="OrganizationData"
					check-strictly
					:render-after-expand="false"
					:props="props"
					style="width: 240px" />
			</div>
			<div class="operation-buttons">
				<el-button icon="Delete" @click="resetButton">重置</el-button>
				<el-button type="primary" icon="Edit" @click="searchButton">查询</el-button>
			</div>
		</el-card>
		<el-card fit="true">
			<!-- 卡片头部添加按钮 -->
			<div class="button">
				<el-button type="primary" icon="Plus" @click="addButton">添加</el-button>
			</div>
			<!-- 卡片中部表格 -->
			<el-table border :data="tableData" :table-layout="tableLayout" style="margin: 10px 0">
				<el-table-column align="center" label="序号" type="index"></el-table-column>
				<el-table-column align="center" label="账号" prop="Account"></el-table-column>
				<el-table-column align="center" label="头像">
					<template #="{ row, $index }">
						<img :src="row.AvatarUrl" alt="无头像" style="width: 50px; height: 50px" />
					</template>
				</el-table-column>
				<el-table-column label="状态" sortable align="center">
					<template #default="{ row }">
						<el-tag v-if="row.IsDisabled" type="danger">禁用</el-tag>
						<el-tag v-else type="success">启用</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" label="昵称" prop="Name"></el-table-column>
				<el-table-column align="center" label="邮箱" prop="Email"></el-table-column>
				<el-table-column align="center" label="手机号" prop="Phone"></el-table-column>
				<el-table-column align="center" label="角色">
					<template #default="{ row }">
						<el-tag size="small" v-for="(role, index) in row.Roles" :key="index">
							{{ role }}
						</el-tag>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" fixed="right">
					<template #="{ row, $index }">
						<el-button type="primary" size="small" @click="editButton(row)" icon="Edit"></el-button>
						<el-divider direction="vertical" />
						<el-button type="danger" size="small" @click="deleteButton" icon="Delete"></el-button>
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
				@current-change="getTableData"
				@size-change="sizeChange"
				:hide-on-single-page="true"
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:default-page-size="5"
				:page-sizes="[5, 10, 15, 20]"
				:background="true"
				layout="prev, pager, next, jumper,->,sizes,total "
				:total="total" />
		</el-card>
	</div>
	<edit ref="editP" :OrganizationData="OrganizationDataCopy" @refreshData="getTableData"></edit>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getAllAccountList } from '@/api/admin/account/index';
import { getOrganizationTrees } from '@/api/admin/organization';
// 引入自定义组件
import edit from './components/edit.vue';
const editP = ref();
// 表格宽度自动适应
const tableLayout = ref('auto');
// 表格当前页码
const currentPage = ref<number>(1);
// 表格每页显示条目个数
const pageSize = ref<number>(5);
// 数据库数据总数
const total = ref<number>(0);
// 存储账户信息
const tableData = ref<any[]>([]);
// 存储组织信息
const OrganizationData = ref<any[]>([]); // 自己用
const OrganizationDataCopy = ref<any[]>([]); // 子组件用
const organizationValue = ref('0'); // 默认选中全部
// 树形选框配置
const props = {
	value: 'OrganizationId',
	label: 'Name',
	children: 'children',
	disabled: 'IsDisabled'
};

// 表格显示数目变化
const sizeChange = () => {
	currentPage.value = 1;
	getTableData();
};
// 添加按钮
const addButton = () => {
	editP.value.open();
};
// 编辑按钮
const editButton = (row: any) => {
	editP.value.open(row);
};

// 删除按钮
const deleteButton = () => {};
// 查询按钮
const searchButton = () => {
	//console.log(organizationValue.value);
	getTableData();
};

// 重置
const resetButton = () => {
	organizationValue.value = '0';
	getTableData();
};

// 发送请求
// 刷新页面数据
const getTableData = async () => {
	// 发送请求
	let result = await getAllAccountList(+organizationValue.value, currentPage.value, pageSize.value);
	if (result.code === 200) {
		// 存储总数
		total.value = result.data.total;
		// 存储数据
		console.log(result.data);
		tableData.value = result.data.records;
		// 获取组织信息
		getOrganizationData();
	} else {
		ElMessage.error(result.message);
	}
};

// 更新页面数据
const getOrganizationData = async () => {
	// 发送请求
	const res = await getOrganizationTrees();
	console.log(res);
	if (res.code === 200) {
		// 表格数据赋值
		OrganizationData.value = res.data;
		// 存一个深拷贝
		OrganizationDataCopy.value = [...OrganizationData.value];
		OrganizationData.value.unshift({ OrganizationId: '0', Name: '全部组织' });
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

// .box-card {
// 	// display: flex;
// 	// justify-content: space-between;
// }

// 头部搜索框样式
.screen {
	display: flex;
	width: 100%;
	height: 5%;

	.input {
		float: left;
		text-align: center;
	}

	.operation-buttons {
		float: right;
		margin-left: 100px;
	}
}
</style>
