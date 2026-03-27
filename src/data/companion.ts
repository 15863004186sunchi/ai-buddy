export type CompanionRole = 'assistant' | 'user';

export interface CompanionMessage {
  id: string;
  role: CompanionRole;
  author: string;
  text: string;
  steps?: string[];
  closing?: string;
}

export const companionHeader = {
  title: 'SoulEcho',
  timestamp: '今天下午 2:15',
  status: '正在倾听你的呼吸...',
};

export const companionMessages: CompanionMessage[] = [
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
      '深呼一口气，数到 4 再慢慢呼出',
    ],
    closing: '我会在这里陪着你，慢慢来。',
  },
];

export const composerActions = {
  placeholder: '分享你的想法...',
  plus: '+',
  voice: '语音',
  send: '发送',
  settings: '设置',
};

export const companionFeedbackMessages = {
  emptyDraft: '先写点想说的话，我会在这里听你。',
  plus: '添加功能暂未开放',
  voice: '语音功能暂未开放',
  settings: '设置功能暂未开放',
} as const;

export const companionReplyTemplates = [
  '谢谢你愿意说出来。我们可以先抓住最让你在意的那一件事，慢慢拆开。',
  '我听见你的紧绷了。先不用急着解决全部问题，我们一步一步来。',
  '你已经很努力了。现在能把感受说出来，本身就是在照顾自己。',
];

export const companionKeywordReplyGroups = [
  {
    keywords: ['累', '疲惫', '压力', '忙', '乱', '撑不住'],
    replies: [
      '听起来你已经扛了很久。先把肩膀放松一点，我们只挑眼前最急的一件事来面对。',
      '这种被事情包围的感觉真的很耗能。你不用一次把所有问题都处理完，我会陪你慢慢理顺。',
    ],
  },
  {
    keywords: ['睡', '失眠', '焦虑', '紧张', '害怕'],
    replies: [
      '你现在像被思绪拽得很紧。先和我一起慢一点，先照顾呼吸，再去看问题本身。',
      '焦虑来临的时候，先不用逼自己立刻平静。你可以先停一停，我会陪你把心跳放慢。',
    ],
  },
  {
    keywords: ['难过', '委屈', '伤心', '想哭', '孤单'],
    replies: [
      '这些情绪被你压在心里一定很辛苦。你可以继续说，我会认真接住你的每一句话。',
      '难过的时候不需要马上坚强。先允许自己被看见，再慢慢找回一点点力气。',
    ],
  },
];

export function createMockCompanionReply(draft: string, replyIndex: number) {
  const normalizedDraft = draft.trim();
  const matchedGroup = companionKeywordReplyGroups.find((group) =>
    group.keywords.some((keyword) => normalizedDraft.includes(keyword)),
  );
  const templates = matchedGroup?.replies ?? companionReplyTemplates;

  return templates[replyIndex % templates.length];
}
