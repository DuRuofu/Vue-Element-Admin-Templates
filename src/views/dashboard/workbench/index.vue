<template>
	<el-card>
		<div class="box">
			<el-avatar :size="120" :src="accountStore.accountInfo.AvatarUrl" />
			<span class="title">
				{{ getTime() }}好,{{ accountStore.accountInfo.Name }},开始您一天的工作吧！
			</span>
		</div>
	</el-card>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time';
// 获取用户仓库
import useAcountStore from '@/stores/modules/account';
const accountStore = useAcountStore();
// 页面加载,获取用户数据
</script>

<style scoped lang="scss">
.box {
	display: flex;

	.title {
		margin-left: 20px;
		font-size: 20px;
		line-height: 120px;
	}
}
</style>
