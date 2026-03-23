export interface OnboardingStep {
  step: number;
  eyebrow: string;
  title: string;
  description: string;
  accent: string;
}

export const onboardingSteps: OnboardingStep[] = [
  {
    step: 1,
    eyebrow: 'SoulEcho',
    title: '开始你的心灵旅程',
    description: '在柔和的陪伴里安放情绪，让每一次呼吸、记录与倾听都更有归属感。',
    accent: '欢迎来到 AI Buddy',
  },
  {
    step: 2,
    eyebrow: '情绪记录',
    title: '记录情绪，见证成长',
    description: '通过轻量的情绪记录与每日回响，把心情波动转化成看得见的成长轨迹。',
    accent: '觉察比答案更重要',
  },
  {
    step: 3,
    eyebrow: '身心疗愈',
    title: '在安静里，重新靠近自己',
    description: '呼吸练习、自然声景与温柔提醒，会在你需要的时候提供一份恰到好处的支持。',
    accent: '准备好开启专属陪伴',
  },
];