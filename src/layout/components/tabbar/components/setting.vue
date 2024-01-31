<template>
	<div class="Set">
		<!-- 全屏 -->
		<el-button size="small" class="fullscreen" circle>
			<el-icon :size="16"><FullScreen /></el-icon>
		</el-button>
		<!-- 消息 -->
		<el-button size="small" class="messamge" circle>
			<el-icon :size="16"><Message /></el-icon>
		</el-button>
		<!-- 设置 -->
		<el-button size="small" class="setting" circle>
			<el-icon :size="16"><Setting /></el-icon>
		</el-button>
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
	</div>
</template>

<script setup lang="ts">
// 导入element-plus 图标
import { Setting, FullScreen, Message, ArrowDown } from '@element-plus/icons-vue';
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
// 用户头像
const state = reactive({
	circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
});
const { circleUrl } = toRefs(state);
const router = useRouter();
const goLogin = () => {
	router.push('/login');
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
</style>
