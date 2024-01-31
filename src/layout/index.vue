<template>
	<div class="menu">
		<el-container>
			<el-aside class="aside" :width="isCollapse ? '64px' : '210px'">
				<el-menu class="el-menu" :collapse-transition="false" :collapse="isCollapse" router>
					<!-- 头部logo -->
					<div class="menu-head">
						<div class="logo">
							<img src="@/assets/img/favicon.ico" alt="" />
						</div>
						<div class="title" v-if="!isCollapse ? true : false">Vue-Admin</div>
					</div>
					<!-- 动态生成路由 -->
					<routemenu :menuList="accountStore.menuRoutes" ref="menuP"></routemenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<div class="header-left">
						<el-button
							class="menu-fold-button"
							@click="menuFold"
							:icon="!isCollapse ? DArrowLeft : DArrowRight" />
					</div>
					<div class="header-right">
						<!-- 全屏 -->
						<el-icon class="fullscreen"><FullScreen /></el-icon>
						<!-- 消息 -->
						<el-icon class="messamge"><Message /></el-icon>
						<!-- 头像 -->
						<el-avatar :size="24" :src="circleUrl" />
						<!-- 下拉框 -->
						<el-dropdown>
							<span class="el-dropdown-link">
								Vue-Admin
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
						<!-- 设置 -->
						<el-icon class="setting"><Setting /></el-icon>
					</div>
				</el-header>
				<el-main>
					<!-- 动态部分 -->
					<router-view></router-view>
					<!-- 动态部分 -->
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script setup lang="ts">
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
// 导入菜单组件
import routemenu from './components/menu.vue';
// 导入element-plus 图标
import {
	DArrowLeft,
	DArrowRight,
	Setting,
	FullScreen,
	Message,
	ArrowDown
} from '@element-plus/icons-vue';
// 导入用户仓库
import useAccountStore from '@/stores/modules/account';
const accountStore = useAccountStore();
const router = useRouter();

const state = reactive({
	circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});
const { circleUrl } = toRefs(state);

// 定义路由导航组件的引用
const menuP = ref();

// 控制菜单折叠
const isCollapse = ref(false);
// 菜单组件折叠方法
const menuFold = () => {
	isCollapse.value = !isCollapse.value;
};

const goLogin = () => {
	router.push('/login');
};
</script>

<style scoped lang="scss">
// 菜单样式
.el-menu {
	width: 100%;
	height: 100vh;
	color: #c3c5c8;
	background: #001529;

	// 菜单头部
	.menu-head {
		display: flex;
		align-items: center;
		height: 40px;
		padding: 13px;

		.logo {
			align-items: center; /* 垂直居中 */
		}

		.title {
			margin-left: 10px;
			font-size: 18px;

			// 字体加粗
			font-weight: bolder;
			color: #fff;
			background: #001529;
		}
	}
}

// 头部样式
.el-header {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 48px;
	padding: 0;
	background: #fff;
	box-shadow: 0 0 5px 1px #c2bebe;

	.menu-fold-button {
		float: left;
		width: 20px;
		height: 48px;
		border: none;
	}

	.header-right {
		display: flex;
		align-items: center;

		.fullscreen {
			margin-right: 20px;
		}

		.messamge {
			margin-right: 20px;
		}

		.el-avatar {
			margin-right: 20px;
		}

		.el-dropdown {
			margin-right: 8px;
		}

		// 去除下拉框焦点轮廓
		.el-dropdown,
		.el-dropdown * {
			outline: none;
		}

		.setting {
			margin-right: 10px;
		}
	}
}
</style>
