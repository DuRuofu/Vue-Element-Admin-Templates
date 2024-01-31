<template>
	<div>
		<el-breadcrumb separator="/">
			<el-breadcrumb-item
				v-for="(item, index) in $route.matched"
				:key="index"
				v-show="item.meta.title"
				:to="item.path">
				<!-- <el-icon>
					<component :is="item.meta.icon"></component>
				</el-icon> -->
				{{ item.meta.title }}
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
