export const companionHeader = {
  title: 'SoulEcho',
  timestamp: '今天下午 2:15',
  status: '正在倾听你的呼吸...',
};

export const companionMessages = [
  {
    id: 'assistant-1',
    role: 'assistant',
    author: 'SoulEcho',
    text: '我能感觉到你此刻的疲惫。深呼吸，这并不是你的错。现在的这种压力就像一片云，虽然遮住了阳光，但它终究会飘走的。',
  },
  {
    id: 'user-1',
    role: 'user',
    author: '你',
    text: '事情太多了，我感觉自己快要窒息了。我不知道该从哪里开始，大脑一片混乱。',
  },
  {
    id: 'assistant-2',
    role: 'assistant',
    author: 'SoulEcho',
    text: '没关系的。让我们试着把思绪带回当下。我们来做一个简单的着陆练习。',
    steps: [
      '寻找 3 种你现在能看到的颜色',
      '感受 2 种皮肤触碰到的质感',
      '深吸一口气，数到 4 再慢慢呼出',
    ],
    closing: '我会在这里陪着你，慢慢来。',
  },
];

export const composerActions = {
  placeholder: '分享你的想法...',
  secondary: 'mic',
  primary: 'send',
};