//小仓库:layout组件相关配置仓库
import { defineStore } from 'pinia';

const useLayoutSettingStore = defineStore('SettingStore', {
	state: () => {
		return {
			refsh: false, //仓库这个属性用于控制刷新效果
			dark: false, //暗黑模式
			themeColors: '#409EFF' //主题颜色
		};
	},
	actions: {
		// 切换暗黑模式
		changeDark() {
			// 获取html元素
			const html: any = document.querySelector('html');
			// 判断是否是暗黑模式
			this.dark ? (html.className = 'dark') : (html.className = '');
		},
		// 切换主题颜色
		changeThemeColors() {
			// 获取html元素
			const html: any = document.querySelector('html');
			// 判断是否是暗黑模式
			html.style.setProperty('--el-color-primary', this.themeColors);
		},
		// 重置设置
		resetSetting() {
			// 重置参数
			this.dark = false;
			this.themeColors = '#409EFF';
			// 刷新样式
			this.changeDark();
			this.changeThemeColors();
		}
	}
});

export default useLayoutSettingStore;
