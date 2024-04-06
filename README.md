# Watermark

> watermark 是一个用于在网页中创建水印的 npm 包。它提供了一个简单易用的接口，让你可以轻松地添加自定义水印到网页内容中。无论是在保护敏感信息还是在展示品牌标识时，这个包都能帮助你快速生成具有专业外观的水印效果。

<img src="./public/demo.jpg" />


## ✨ 特性

- 支持TS
- 丰富的配置项
- 使用简单

## 安装

使用 npm:
```
npm install watermark --save
```

使用 pnpm:
```
pnpm install watermark --save
```

## 基础使用

```js
import { generate } from "./watermark"
generate("蟹老板 18岁")
```

## 清除水印

```js
import { generate, clearWatermark } from "./watermark"
const watermarkId = generate("蟹老板 18岁")
clearWatermark(watermarkId)
```

## Issues

https://github.com/Belen-Luo/watrmark/issues

## 更新日志

### 发布周期

- 修订版本号：日常bugfix更新。
- 次版本号：发布带有新特性的向下兼容的版本。
- 主版本号：含有破坏性更新和新特性。

#### v1.0.0

- 网页水印创建

#### v1.1.0

- 添加水印清除功能
