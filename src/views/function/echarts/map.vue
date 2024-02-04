<template>
	<div class="echarts-box">
		<div id="myEcharts" :style="{ width: '100%', height: '100%' }"></div>
	</div>
</template>

<script setup lang="ts">
// 导入Echarts
import * as echarts from 'echarts';
import { onMounted, onUnmounted } from 'vue';
// 引入中国地图数据
import chinaJson from '@/assets/json/china.json';
/// 声明定义一下echart
let echart = echarts;
// 注册地图
echarts.registerMap('china', chinaJson as any);
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
		// 标题
		title: {
			text: '地图演示'
		},
		// 地图组件
		geo: {
			map: 'china',
			roam: true, //鼠标缩放
			left: 0,
			right: 0,
			// 显示的文字
			label: {
				show: true
			},
			// 每一个多边形的样式
			itemStyle: {
				areaColor: '#fff',
				borderColor: '#111'
			}
		}
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

<!-- https://datav.aliyun.com/portal/school/atlas/area_selector -->
