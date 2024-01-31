<template>
	<div class="menu">
		<el-container>
			<el-aside :width="isCollapse ? '64px' : '210px'" class="aside">
				<!-- 动态生成路由 -->
				<Menu ref="menuP"></Menu>
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
import Menu from './components/menu/index.vue';
// 导入element-plus 图标
import { DArrowLeft, DArrowRight, FullScreen, Message, ArrowDown } from '@element-plus/icons-vue';

const router = useRouter();

const state = reactive({
	circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});
const { circleUrl } = toRefs(state);

// 定义路由导航组件的引用
const menuP = ref();
// 忘记密码方法
const menuFold = () => {
	console.log('忘记密码');
	// 打开忘记密码组件
	menuP.value.menuFold();
};

const goLogin = () => {
	router.push('/login');
};
</script>

<style scoped lang="scss">
// 菜单样式

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

// 样式穿透设置菜单字体颜色
:deep(.el-sub-menu__title) {
	color: #c3c5c8;
}

// 样式穿透设置动态样式
:deep(.el-menu-item:hover) {
	color: #fff !important;
	background: #001529 !important;
}

:deep(.el-sub-menu__title:hover) {
	color: #fff;
	background: #001529;
}

:deep(.el-sub-menu:hover) {
	background: #001529;
}
</style>
