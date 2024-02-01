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
			text: '饼状图演示'
		},
		legend: {
			top: 'bottom'
		},
		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true }
			}
		},
		series: [
			{
				name: 'Nightingale Chart',
				type: 'pie',
				radius: [50, 250],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 8
				},
				data: [
					{ value: 40, name: 'rose 1' },
					{ value: 38, name: 'rose 2' },
					{ value: 32, name: 'rose 3' },
					{ value: 30, name: 'rose 4' },
					{ value: 28, name: 'rose 5' },
					{ value: 26, name: 'rose 6' },
					{ value: 22, name: 'rose 7' },
					{ value: 18, name: 'rose 8' }
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
