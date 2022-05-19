# vite-plugin-vue-style-pxtorem

一个vite插件转换vue模板内联样式px到rem

## Install

```bash
pnpm install vite-plugin-vue-style-pxtorem --save-dev
```

## options

Type: `Object | Null`  
Default:
```js
{
    rootValue: 16,
    unitPrecision: 5,
    minPixelValue: 0,
    exclude: []
}
```
## 注意
- 此插件只对vue文件中的`<template>`标签内的内容做转换
- 此插件必须在@vitejs/plugin-vue之前，因为vue文件会被@vitejs/plugin-vue编译，后续无法通过`/<template>([\s\S]+)<\/template>/gi`匹配到。

## 参考插件
[postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)

