module.exports = {
	//运行环境
	env: {
		browser: true,
		es2021: true
	},
	//规则继承
	extends: [
		// 全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
		// 比如:函数不能重名、对象不能出现重复key
		'eslint:recommended',
		// typescript语法规则
		'plugin:@typescript-eslint/recommended',
		// vue3语法规则
		'plugin:vue/vue3-essential',
		// prettier规则
		'plugin:prettier/recommended'
	],
	//要为特定类型的文件指定处理器
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	//指定解析器选项
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', 'vue'],
	//eslint规则
	rules: {
		// eslint（https://eslint.bootcss.com/docs/rules/）
		'no-var': 'error', // 要求使用 let 或 const 而不是 var
		'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unexpected-multiline': 'error', // 禁止空余的多行
		'no-useless-escape': 'off', // 禁止不必要的转义字符

		// typeScript (https://typescript-eslint.io/rules)
		'@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
		'@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
		'@typescript-eslint/semi': 'off',

		// eslint-plugin-vue (https://eslint.vuejs.org/rules/)
		'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
		'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
		'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
		'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式

		//打开eslint-plugin-prettier插件提供的规则，该插件从 ESLint 内运行 Prettier
		//打开eslint-plugin-prettier插件提供的规则，该插件从 ESLint 内运行 Prettier
		'prettier/prettier': 'error',
		//关闭对应的这两个 ESLint 核心规则，这两个规则和prettier插件一起使用会出现问题
		'arrow-body-style': 'off',
		'prefer-arrow-callback': 'off'
	}
};
