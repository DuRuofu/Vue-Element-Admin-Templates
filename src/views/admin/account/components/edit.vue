<template>
	<el-dialog v-model="state.Dialog" :title="title" width="50%">
		<div>
			<!-- 添加用户表单 -->
			<el-form style="width: 80%">
				<el-form-item label="组织">
					<el-tree-select
						v-model="Data.organizationValue"
						:data="OrganizationData"
						check-strictly
						:render-after-expand="false"
						:props="props"
						style="width: 240px" />
				</el-form-item>
				<el-form-item label="角色">
					<el-select multiple v-model="Data.Roles" placeholder="选择角色" style="width: 240px">
						<el-option
							v-for="item in RolesData"
							:key="item.RoleId"
							:label="item.Name"
							:value="item.Value"
							:disabled="item.IsDisabled" />
					</el-select>
				</el-form-item>
				<el-form-item label="账户">
					<el-input
						v-model="Data.Account"
						placeholder="请输入用户账号"
						:disabled="state.Edit ? 1 : 0"></el-input>
				</el-form-item>
				<el-form-item label="昵称">
					<el-input v-model="Data.Name" placeholder="请输入用户名称"></el-input>
				</el-form-item>
				<el-form-item label="启用状态">
					<el-radio-group v-model="Data.IsDisabled">
						<el-radio label="0">启用</el-radio>
						<el-radio label="1">禁用</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="Data.Password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="Data.Phone" placeholder="请输入手机号"></el-input>
				</el-form-item>
				<el-form-item label="邮箱">
					<el-input v-model="Data.Email" placeholder="请输入邮箱"></el-input>
				</el-form-item>
			</el-form>
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
import { getRoles } from '@/api/admin/role/index';
import { addAccount, updateAccount } from '@/api/admin/account/index';
// 树形选框配置
const props = {
	value: 'OrganizationId',
	label: 'Name',
	children: 'children',
	disabled: 'IsDisabled'
};

const title = ref('');
const Data = reactive({
	id: '',
	organizationValue: '',
	Roles: <any[]>[],
	Account: '',
	Name: '',
	IsDisabled: '',
	Password: '',
	Email: '',
	Phone: ''
});

const RolesData = ref();

// 确认
const updateButton = async () => {
	// 添加模式
	if (state.Edit == 0) {
		// 参数校验
		if (
			Data.organizationValue == '' ||
			Data.Account == '' ||
			Data.Name == '' ||
			Data.Password == '' ||
			Data.Phone == '' ||
			Data.Email == ''
		) {
			ElMessage.error('请输入必填项');
			return;
		}
		// 补充默认值
		if (Data.Roles.length == 0) {
			Data.Roles = ['default'];
		}
		// 发送请求
		const res = await addAccount({
			OrganizationId: Data.organizationValue,
			Roles: Data.Roles,
			Account: Data.Account,
			Password: Data.Password,
			IsDisabled: Data.IsDisabled,
			Phone: Data.Phone,
			Email: Data.Email
		});
		if (res.code === 200) {
			// 消息弹窗
			ElMessage.success('添加成功');
			// 刷新页面
			emit('refreshData');
			// 关闭弹窗
			state.Dialog = false;
			state.Edit = 0;
		} else {
			ElMessage.error(res.message);
		}
	}
	// 修改模式
	if (state.Edit == 1) {
		// 参数校验
		if (
			Data.organizationValue == '' ||
			Data.Account == '' ||
			Data.Name == '' ||
			Data.Password == '' ||
			Data.Phone == '' ||
			Data.Email == ''
		) {
			ElMessage.error('请输入必填项');
			return;
		}
		// 补充默认值
		if (Data.Roles.length == 0) {
			Data.Roles = ['default'];
		}
		// 发起请求
		const res = await updateAccount(Data.id, {
			OrganizationId: Data.organizationValue,
			Roles: Data.Roles,
			Name: Data.Name,
			Password: Data.Password,
			IsDisabled: Data.IsDisabled,
			Phone: Data.Phone,
			Email: Data.Email
		});
		if (res.code === 200) {
			// 消息弹窗
			ElMessage.success('修改成功');
			// 刷新页面
			emit('refreshData');
			// 关闭弹窗
			state.Dialog = false;
			state.Edit = 0;
		} else {
			ElMessage.error(res.message);
		}
	}
};
// 取消
const cancelButton = () => {
	// 消息弹窗
	ElMessage.info('已取消编辑');
	state.Dialog = false;
};
// ------------页面数据更新---------------
// 获取角色列表
const getRolesData = async () => {
	// 发送请求
	let result = await getRoles();
	if (result.code === 200) {
		// 存储数据
		RolesData.value = result.data;
		console.log(result.data);
	} else {
		ElMessage.error(result.message);
	}
};

const getTableData = async () => {
	// 获取角色列表
	await getRolesData();
};

// ------------生命周期函数-------
// 组件挂载完毕
onMounted(() => {
	getTableData(); // 获取表格数据
});

// -----------对外暴露方法----------------
// 包装弹窗对象
const state = reactive({
	Dialog: false,
	Edit: 0
});

// 打开弹窗方法
const open = (row: any) => {
	state.Dialog = true;
	if (row == undefined) {
		title.value = '添加账户';
		//默认值
		Data.Roles = ['default'];
		Data.IsDisabled = '0';
		Data.Account = '';
		Data.Name = '';
		Data.Password = '';
		Data.Phone = '';
		Data.Email = '';
	} else {
		state.Edit = 1;
		// 修改
		title.value = '修改账户';
		Data.id = row.AccountId;
		Data.Roles = row.Roles;
		Data.Account = row.Account;
		Data.Name = row.Name;
		Data.Password = row.Password;
		Data.IsDisabled = row.IsDisabled ? '1' : '0';
		Data.Phone = row.Phone;
		Data.Email = row.Email;
		Data.organizationValue = row.OrganizationId;
	}
};

// 暴露打开弹窗方法
defineExpose({
	open
});
// 接收父组件参数
defineProps(['OrganizationData']);

// 声明自定义事emit件
const emit = defineEmits(['refreshData']);
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
