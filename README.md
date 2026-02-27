# 个人作品集项目说明文档

## 1. 项目概述

本项目是一个响应式的个人作品集静态网站，主要功能包括：
- 展示个人项目卡片（支持图片、视频、描述、标签）。
- 响应式设计，适配 PC 和移动端。
- **特色功能**：集成微信小程序唤起方案，支持在微信环境内直接跳转小程序，或在非微信/PC环境下引导扫码。

---

## 2. 数据配置说明 (`portfolio-data.js`)

项目的核心数据存储在 `portfolio-data.js` 中，通过 `portfolioData` 数组管理。每个对象代表一个项目卡片。

### 通用字段
- `title`: 项目标题
- `desc`: 项目描述
- `tags`: 技术栈标签数组
- `image`: 封面图片路径（支持 `.jpg`, `.png`, `.gif` 等）
- `aspectRatio`: 图片宽高比（如 `"16/9"`, `"1/1"`），用于控制卡片展示效果

### 微信小程序卡片特别配置
针对需要跳转微信小程序的项目（如“优惠券分发小程序”），配置有特殊要求。

**代码位置：** `portfolio-data.js` 第 91-100 行
```javascript
{
  title: "优惠券分发小程序",
  // ... 其他描述 ...
  
  // 核心配置 1: 跳转链接
  // 指向中间页 jump-mp.html，用于处理微信环境内的开放标签逻辑  🔺需要及时更新 否则跳转失效
  link: "https://zhangzhicong-0ginpr154d8021ee-1309785551.tcloudbaseapp.com/jump-mp/", 
  
  // 核心配置 2: 引导提示
  // 当在 PC 端或非微信环境下点击时，弹窗显示的提示语
  tip: "长按识别小程序码，或保存图片后在微信扫一扫", 
  
  // 核心配置 3: 小程序码图片
  // 必须提供小程序码图片，用于弹窗展示（扫码进入）
  image: "./img/wechat.png", 
  
  tags: ["Uni-app", "微信小程序"],
  aspectRatio: "1/1"
}
```

---

## 3. 微信小程序跳转方案详解

本项目采用 **“云开发静态网站托管 + 开放标签”** 的方案，实现微信环境内免鉴权跳转小程序。

### 为什么需要区分环境？

由于微信开放标签 `<wx-open-launch-weapp>` 的限制和用户体验考虑，我们需要在不同环境下采用不同的交互策略：

| 环境 | 策略 | 实现逻辑 |
| :--- | :--- | :--- |
| **PC 端** | **弹窗扫码** | PC 微信虽然支持打开小程序，但网页跳转体验往往不如直接扫码流畅；且非微信 PC 浏览器无法识别开放标签。因此统一强制弹窗展示小程序码。 |
| **移动端 (非微信)** | **弹窗扫码** | 普通浏览器（如 Safari, Chrome）无法识别微信开放标签，需引导用户保存图片或截图扫码。 |
| **移动端 (微信内)** | **直接跳转** | 识别到是微信环境且非 PC 时，直接跳转到 `jump-mp.html` 中间页，渲染“打开小程序”按钮，点击即可唤起。 |

### 核心实现逻辑 (`index.html`)

在 `renderPortfolio` 函数中，通过 UserAgent 判断设备类型，动态绑定点击事件：

```javascript
// 伪代码逻辑
if (是小程序项目) {
    if (是PC端 || 不是微信环境) {
        // 策略 A: 阻止默认跳转，改为弹窗显示图片(image)和提示(tip)
        showModal(card.image, card.tip);
        return false;
    } else {
        // 策略 B: 允许默认跳转，进入 link 配置的 jump-mp.html
        return true;
    }
}
```

---

## 4. 中间页 (`jump-mp.html`) 配置与部署

`jump-mp.html` 是实现微信内跳转的核心页面，使用了微信云开发的 **“静态网站免鉴权”** 能力。

### 关键配置
您需要修改 `jump-mp.html` 中的云开发配置才能生效：

1.  **替换云环境 ID**：
    找到以下代码（约第 57 行），将 `resourceEnv` 替换为您真实的腾讯云云开发环境 ID。
    ```javascript
    var c = new cloud.Cloud({
        identityless: true, 
        resourceAppid: 'wxac0b60031891ca0c', // 资源方 AppID (您的公众号/小程序 AppID)
        resourceEnv: 'REPLACE_WITH_YOUR_CLOUD_ENV_ID', // ⚠️ 必须替换为真实 ID (如 prod-xxxxxx)
    })
    ```

2.  **配置跳转目标**：
    找到 `<wx-open-launch-weapp>` 标签（约第 163 行），配置要跳转的小程序原始 ID 和路径。
    ```html
    <wx-open-launch-weapp username="gh_xxxxxxx" path="pages/index/index">
    ```

### 部署要求 (至关重要)

由于使用了云开发免鉴权能力，**此页面不能直接在普通服务器或本地运行**。

1.  **必须部署到腾讯云**：
    必须将 `jump-mp.html` 上传到微信开发者工具 -> 云开发控制台 -> **静态网站托管**。
2.  **必须使用云开发域名**：
    访问地址必须是云开发提供的域名（如 `https://xxxx.tcloudbaseapp.com/jump-mp.html`）或绑定的自定义域名。
3.  **权限配置**：
    确保云开发环境的“静态网站托管”功能已开启，且允许“免鉴权”访问（通常默认支持）。

---

## 5. 总结

- **配置数据**：在 `portfolio-data.js` 中设置 `link` 为 `./jump-mp.html`。
- **修改代码**：在 `jump-mp.html` 中填入真实的 `resourceEnv`。
- **上传部署**：将 `jump-mp.html` 上传至腾讯云静态网站托管。
- **测试验证**：在微信手机端访问云开发域名链接，即可看到“打开小程序”按钮。
