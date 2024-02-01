<template>
	<div class="Set">
		<!-- 刷新 -->
		<el-button size="small" class="refresh" @click="updateRrfresh" circle>
			<el-icon :size="16"><Refresh /></el-icon>
		</el-button>
		<!-- 全屏 -->
		<el-button size="small" class="fullscreen" @click="fullScreen" circle>
			<el-icon :size="16"><FullScreen /></el-icon>
		</el-button>
		<!-- 消息 -->
		<el-button size="small" class="messamge" circle>
			<el-icon :size="16"><Message /></el-icon>
		</el-button>
		<!-- 设置 -->
		<el-button size="small" class="setting" @click="webSetting" circle>
			<el-icon :size="16"><Setting /></el-icon>
		</el-button>
		<!-- 头像 -->
		<el-avatar :size="28" :src="accountStore.accountInfo.AvatarUrl" />
		<!-- 下拉框 -->
		<el-dropdown>
			<span class="el-dropdown-link">
				{{ accountStore.accountInfo.Name }}
				<el-icon class="el-icon--right">
					<arrow-down />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>文档</el-dropdown-item>
					<el-dropdown-item>代码仓库</el-dropdown-item>
					<el-dropdown-item @click="goLogin">退出系统</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
	<!-- 设置抽屉 -->
	<el-drawer v-model="drawer" class="drawer" size="250px" title="项目配置" :with-header="true">
		<template #header>
			<div class="drawer-haheader">
				<h2>系统配置</h2>
			</div>
		</template>
		<div class="drawe-content">
			<el-divider>主题</el-divider>
			<el-switch
				v-model="layoutSettingStore.dark"
				size="large"
				@change="layoutSettingStore.changeDark"
				:active-action-icon="Moon"
				:inactive-action-icon="Sunny"
				style="

--el-switch-on-color: #323734; --el-switch-off-color: #a0b4a8" />
			<el-divider>配色</el-divider>
			<el-form>
				<el-form-item label="主题色:">
					<el-color-picker
						v-model="layoutSettingStore.themeColors"
						@change="layoutSettingStore.changeThemeColors" />
				</el-form-item>
			</el-form>
			<el-divider>界面功能</el-divider>
			<el-form>
				<el-form-item label="功能1">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能2">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能3">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能4">
					<el-switch />
				</el-form-item>
			</el-form>
			<el-divider>界面展示</el-divider>
			<el-form>
				<el-form-item label="功能1">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能2">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能3">
					<el-switch />
				</el-form-item>
				<el-form-item label="功能4">
					<el-switch />
				</el-form-item>
			</el-form>
			<el-divider></el-divider>
			<el-button
				class="botton-bottom"
				type="warning"
				:icon="Refresh"
				@click="layoutSettingStore.resetSetting">
				重置
			</el-button>
		</div>
	</el-drawer>
</template>

<script setup lang="ts">
// 导入element-plus 图标
import {
	Setting,
	FullScreen,
	Message,
	ArrowDown,
	Refresh,
	Moon,
	Sunny
} from '@element-plus/icons-vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// 获取layout组件的数据
import useLayoutSettingStore from '@/stores/modules/layout';
const layoutSettingStore = useLayoutSettingStore();
// drawer控制抽屉开启关闭
const drawer = ref(false);
// 获取用户仓库
import useAcountStore from '@/stores/modules/account';
const accountStore = useAcountStore();

const router = useRouter();
const goLogin = () => {
	// 清除用户信息
	accountStore.accountLogout();
	router.push('/login');
};

// 刷新按钮
const updateRrfresh = () => {
	layoutSettingStore.refsh = !layoutSettingStore.refsh;
	console.log(layoutSettingStore.refsh);
};
// 全屏按钮
const fullScreen = () => {
	console.log('全屏'); //DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
	let full = document.fullscreenElement;
	//切换为全屏模式
	if (!full) {
		//文档根节点的方法requestFullscreen,实现全屏模式
		document.documentElement.requestFullscreen();
	} else {
		//变为不是全屏模式->退出全屏模式
		document.exitFullscreen();
	}
};
// 设置按钮
const webSetting = () => {
	drawer.value = true;
};
</script>

<style scoped lang="scss">
.Set {
	display: flex;
	align-items: center;
	height: 48px;

	.el-avatar {
		margin-right: 10px;
	}

	.el-dropdown {
		margin-right: 20px;
	}

	// 去除下拉框焦点轮廓
	.el-dropdown,
	.el-dropdown * {
		outline: none;
	}

	.setting {
		margin-right: 14px;
	}
}

.drawer {
	.drawer-haheader {
		height: 10px;
	}

	.drawe-content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	// .el-form {
	// 	width: 100%;

	// 	.el-form-item {
	// 		width: 100%;
	// 	}
	// }
	.botton-bottom {
		width: 100%;
	}
}
</style>
