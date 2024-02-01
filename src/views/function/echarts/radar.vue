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
			text: '雷达图演示'
		},
		legend: {
			data: ['Allocated Budget', 'Actual Spending']
		},
		radar: {
			// shape: 'circle',
			indicator: [
				{ name: 'Sales', max: 6500 },
				{ name: 'Administration', max: 16000 },
				{ name: 'Information Technology', max: 30000 },
				{ name: 'Customer Support', max: 38000 },
				{ name: 'Development', max: 52000 },
				{ name: 'Marketing', max: 25000 }
			]
		},
		series: [
			{
				name: 'Budget vs spending',
				type: 'radar',
				data: [
					{
						value: [4200, 3000, 20000, 35000, 50000, 18000],
						name: 'Allocated Budget'
					},
					{
						value: [5000, 14000, 28000, 26000, 42000, 21000],
						name: 'Actual Spending'
					}
				]
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
