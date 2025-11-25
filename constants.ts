import { PrizeTier, TierType } from './types';

export const PRIZE_POOL: PrizeTier[] = [
  {
    type: TierType.INSTANT,
    name: "即时反馈包 (Instant Feedback)",
    probability: "50%",
    range: [1, 50],
    color: "text-cyan-400",
    borderColor: "border-cyan-500",
    bgGradient: "from-cyan-900/40 to-blue-900/40",
    items: [
      { 
        id: 'food', 
        title: "味蕾暴击", 
        description: "点一份奶茶/蛋糕/汉堡/炸鸡。", 
        iconName: "Utensils",
        flavorText: "唯有美食与爱不可辜负。这一刻，把体重秤扔到一边，感受多巴胺的欢呼！" 
      },
      { 
        id: 'video', 
        title: "精神食粮", 
        description: "立刻观看一期你最爱的UP主视频。", 
        iconName: "Youtube",
        flavorText: "精神电池电量过低？UP主的视频是最好的快充。按下播放键，快乐即刻送达。" 
      },
      { 
        id: 'game', 
        title: "一局定胜负", 
        description: "开启一局完整的游戏对战或副本。", 
        iconName: "Gamepad2",
        flavorText: "现实世界暂停服务。欢迎回到你忠诚的艾泽拉斯/峡谷/海拉鲁，英雄，去赢下这一局！" 
      },
      { 
        id: 'surf', 
        title: "数字神游", 
        description: "进行15分钟的“无主题”网上冲浪。", 
        iconName: "Globe",
        flavorText: "漫无目的才是互联网的精髓。迷失在信息的海洋里吧，也许会捡到意想不到的贝壳。" 
      },
    ]
  },
  {
    type: TierType.IMMERSIVE,
    name: "沉浸式体验 (Immersive)",
    probability: "30%",
    range: [51, 80],
    color: "text-purple-400",
    borderColor: "border-purple-500",
    bgGradient: "from-purple-900/40 to-fuchsia-900/40",
    items: [
      { 
        id: 'drama', 
        title: "剧情推进许可", 
        description: "完整观看一集你正在追的剧集/动画。", 
        iconName: "Film",
        flavorText: "剧情卡在关键点太难受？解锁封印！现在没有任何事情比知道‘接下来发生了什么’更重要。" 
      },
      { 
        id: 'live', 
        title: "Live朝圣", 
        description: "观看一场偶像的完整演唱会录像(或30分钟)。", 
        iconName: "Music2",
        flavorText: "戴上耳机，关上灯。即使身在卧室，灵魂也已经飞到了万人欢呼的体育馆中心。" 
      },
      { 
        id: 'bed', 
        title: "绝对舒适模式", 
        description: "躲进被窝，享受20分钟的纯粹放松。", 
        iconName: "BedDouble",
        flavorText: "被窝是神圣的不可侵犯领土。躲进去，把世界关在外面，做20分钟的国王。" 
      },
      { 
        id: 'learn', 
        title: "好奇心驱动", 
        description: "选择一个随机主题，进行30分钟的深度探索。", 
        iconName: "Search",
        flavorText: "大脑需要一点新鲜的刺激。去探索那个你一直好奇却没空了解的冷知识吧！" 
      },
    ]
  },
  {
    type: TierType.WISHLIST,
    name: "愿望清单兑换 (Wishlist)",
    probability: "15%",
    range: [81, 95],
    color: "text-amber-400",
    borderColor: "border-amber-500",
    bgGradient: "from-amber-900/40 to-orange-900/40",
    items: [
      { 
        id: 'digital', 
        title: "数字典藏+1", 
        description: "购买一款愿望单游戏/电影/专辑 (单数日期)。", 
        iconName: "Smartphone",
        flavorText: "购物车里的那个图标已经等了太久。就是今天，点击购买，把数据变成专属于你的宝藏。" 
      },
      { 
        id: 'physical', 
        title: "实体质感+1", 
        description: "购买一个提升生活品质的实体小物 (双数日期)。", 
        iconName: "PackageCheck",
        flavorText: "拆快递是现代人的治愈仪式。那个提升幸福感的小物，现在它是你的了。" 
      },
    ]
  },
  {
    type: TierType.LEGENDARY,
    name: "白日梦许可 (Daydream)",
    probability: "5%",
    range: [96, 100],
    color: "text-rose-500",
    borderColor: "border-rose-500",
    bgGradient: "from-rose-900/40 to-red-900/40",
    items: [
      { 
        id: 'daydream', 
        title: "强制摸鱼特权", 
        description: "立刻放下工作/学习，进行30分钟极致放松。", 
        iconName: "CloudSun",
        flavorText: "恭喜触发隐藏彩蛋！系统强制执行‘什么都不做’指令。看着云发呆，才是最高级的生产力。" 
      },
    ]
  }
];