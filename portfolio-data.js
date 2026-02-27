// 作品集数据配置
const portfolioData = [
  {
    groupTitle: "移动端 H5 活动",
    groupDesc: "针对移动端场景优化的营销活动H5，融合高频交互与流畅动画，兼容主流移动设备与Webview环境。",
    cards: [
      {
        title: "2026 马年庆典",
        desc: "3DM春节联动风灵月影送福利。打造沉浸式开奖动画，整合盲盒与直购玩法，累计签到破百万。",
        link: "https://beatingworldline.github.io/horseyear/",
        image: "./img/horseyear.webp",
        tags: ["gsap动画", "营销", "支付"],
        aspectRatio: "10/14"
      },
      {
        title: "盲盒活动",
        desc: "APP常驻商业模块，随《黑神话》同步上线后火爆并持续更新，累计营收破千万",
        link: "https://h5.3dmgame.com/activities/blindCfg?id=50",
        image: "./img/blind.webp",
        tags: ["lottie动画", "移动端"],
        aspectRatio: "10/14"
      },
      {
        title: "纸嫁衣游戏联名活动",
        desc: "持续更新的联名营销活动，已联动如《潜行者2》、《排球少年》、《魔兽世界》、《黑神话：悟空》等。",
        link: "https://h5.3dmgame.com/activities/wedding",
        image: "./img/wedding.png",
        tags: ["联动推广", "任务分发抽奖"],
        aspectRatio: "10/14"
      },
      {
        title: "TGA 年度评选投票",
        desc: "2025年度 TGA 游戏大奖中国区投票页。支持多奖项实时投票与动态榜单展示。",
        link: "https://h5.3dmgame.com/activities/tga",
        image: "./img/tga.webp",
        tags: ["TGA游戏大奖", "投票"],
        aspectRatio: "10/14"
      },
    ]
  },
  {
    groupTitle: "PC 端 Web 应用",
    groupDesc: "面向桌面的高效管理工具与可视化平台，注重功能完备性与操作体验。",
    cards: [
      {
        title: "AI 对话助手",
        desc: "基于阿里千问大模型（Qwen）构建的 AI 对话助手。复刻 DeepSeek 网页端交互体验，实现流式对话与上下文记忆功能。",
        link: "https://beatingworldline.github.io/AI-Chat/",
        image: "./img/AI.png",
        tags: ["Vue3", "阿里百炼 API"],
        aspectRatio: "50/62"
      },
      {
        title: "《黑神话：悟空》地图工具",
        desc: "基于 Leaflet 实现的 Web GIS 游戏地图工具。支持标记筛选、点位追踪与缩放交互，还原游民星空地图核心功能。",
        link: "https://beatingworldline.github.io/wukong-map/",
        image: "./img/map.png",
        tags: ["Leaflet", "Web GIS"],
        aspectRatio: "10/7.3"
      },
      {
        title: "3D VR 看房体验",
        desc: "基于 Three.js 构建的 3D 全景看房 Demo。支持鼠标拖拽视察与空间漫游交互。",
        link: "https://beatingworldline.github.io/3d_vr/",
        image: "./img/three.webp",
        tags: ["Three.js", "Vue", "3D可视化"],
        aspectRatio: "1/1"
      },
      {
        title: "Chrome 插件",
        desc: "Chrome 浏览器插件开发。通过封装通用配置与流程构建，快速将 JS 脚本转化为插件，已应用于 Steam Key 批量激活查询自场景。",
        link: "https://blog.csdn.net/Beatingworldline/article/details/149396600?spm=1001.2014.3001.5502",
        image: "./img/steam.png",
        tags: ["Chrome Extension"],
        aspectRatio: "10/6.7"
      }
    ]
  },
  {
    groupTitle: "其他",
    groupDesc: "",
    cards: [
      {
        title: "CSDN 技术博客",
        desc: "记录20年以来的前端技术成长与实战经验，累计阅读量超 20 万。",
        link: "https://blog.csdn.net/Beatingworldline",
        image: "./img/csdn.png",
        tags: ["学习笔记", "技术分享", "知识沉淀"],
        aspectRatio: "56/58.5"
      },
      {
        title: "优惠券分发小程序",
        desc: "基于 Uni-app 开发的多端小程序（已发布微信端）。由 Vue 项目重构迁移，集成抽奖返现逻辑，主要用于顺风车业务的用户优惠分发。",
        link: "./jump-mp.html", // 跳转到中间页处理小程序唤起逻辑
        tip: "长按识别小程序码，或保存图片后在微信扫一扫",
        image: "./img/wechat.png",
        tags: ["Uni-app", "微信小程序"],
        aspectRatio: "1/1"
        // 小程序跳转文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloudservice/wxcloud/guide/staticstorage/jump-miniprogram.html
      },
      {
        title: "3DM商城",
        desc: "3DM 官方商城，支持PC和H5双端，能够联动3DM-APP、3DM主站、风灵月影",
        link: "https://mall.3dmgame.hk/",
        image: "./img/shop.png",
        tags: ["Vue", "商城"],
        aspectRatio: "1/1"
      }
    ]
  }
];
