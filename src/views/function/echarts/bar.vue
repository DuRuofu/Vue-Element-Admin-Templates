<template>
	<div class="echarts-box">
		<div id="myEcharts" :style="{ width: '100%', height: '100%' }"></div>
	</div>
</template>

<script setup lang="ts">
// 导入Echarts
import * as echarts from 'echarts';
import { onMounted, onUnmounted } from 'vue';
/// 声明定义一下echart
let echart = echarts;

// 组件挂载完成
onMounted(() => {
	initChart();
});

onUnmounted(() => {
	// window.removeEventListener('resize', echart, 20);
	// echart.dispose();
});
// 基础配置一下Echarts
function initChart() {
	let chart = echart.init(document.getElementById('myEcharts'));
	// 把配置和数据放这里
	chart.setOption({
		title: {
			text: '柱状图演示'
		},
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				data: [120, 200, 150, 80, 70, 110, 130],
				type: 'bar'
			}
		]
	});
	window.onresize = function () {
		//自适应大小
		chart.resize();
	};
}
</script>

<style scoped lang="scss">
.echarts-box {
	width: 100%;
	height: 100%;
}
</style>
