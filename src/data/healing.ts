export type HealingDiscoveryHero = {
  badge: string;
  title: string;
  description: string;
  meta: string;
  image: string;
  targetId: string;
};

export type HealingCategory = {
  id: string;
  title: string;
  meta: string;
  icon: string;
  targetId: string;
};

export type HealingTrackSummary = {
  id: string;
  title: string;
  meta: string;
  image: string;
};

export type HealingTrackDetail = {
  id: string;
  title: string;
  typeLabel: string;
  description: string;
  currentTime: string;
  duration: string;
  progressPercent: number;
  coverImage: string;
  backgroundImage: string;
};

export const healingHero: HealingDiscoveryHero = {
  badge: '每日推荐',
  title: '深度睡眠引导',
  description: '在星光与海浪的交响中，开启一场通往潜意识的温柔旅程。',
  meta: '24 分钟 · 5.2k 人正在聆听',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA4AG8jjDOgETwM8vba8F4P7MSBZn2S679Pk0kWtmFxZny8D9DNpsMqKQng1F00ghhFXZbB1ibTXFm8U1tr-Srmjd45kCM_92UpR_gViJCHmnqEGfcdSjYCHxepIlpgY3rOD0can_QlgSb6SRdlsJ8evdmOFBLEzvWxMWaRini6XkyJqOI9P5TXNx-u4UX904WYH-p9F0Jb8OoqSMKT7iqxY7xfmBhggSw3c84pfCeY9mYWr4DB36ZHtGXmwX8x3clSiBLtF82DEyUf',
  targetId: 'track-1',
};

export const healingMoods = ['焦虑', '疲惫', '专注', '喜悦', '低落'];

export const healingCategories: HealingCategory[] = [
  { id: 'sleep', title: '助眠原声', meta: '128 个音频', icon: 'bedtime', targetId: 'track-1' },
  { id: 'meditation', title: '减压冥想', meta: '85 个引导', icon: 'self_improvement', targetId: 'track-2' },
  { id: 'noise', title: '专注白噪音', meta: '42 种氛围', icon: 'waves', targetId: 'track-3' },
  { id: 'morning', title: '晨间唤醒', meta: '15 个时刻', icon: 'wb_sunny', targetId: 'track-4' },
];

export const recentHealingTracks: HealingTrackSummary[] = [
  {
    id: 'track-1',
    title: '林间细雨',
    meta: '环境音 · 15 分钟',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSqJIiEKQnaNIESFwqOJAFMUkCUchO5S67w4mmUMmZwV_73KIt-SyAmVqTv0Cu7_u-gdC80JTPHQ2rWHWk-MuKoyGnhUhuZUgB4iEJnSMKdCaTe5FFlAk2erpHygNrFy4RZ6-V1XpubFBkEQ-NQumv5fyLAt6EGAYgK6qO-TcGpNgWki_7FmDB8B6FcpW8F_Su6X6ELmAD7jufQ4lYDXJrgdUynl0qFOlpxLMZm1J1XZWKH70ZGDDWbVjwsmqSZ8BbuEAznSxPDmuQ',
  },
  {
    id: 'track-2',
    title: '森林深处的宁静',
    meta: '冥想引导 · 30 分钟',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHrLCRdaWdxOPHqCQqry7J-q8hVl1ykjHQauWGjBApHY3uV_Biq9PUkMpP39hMJW8eYEN8QOjzT7YtdDxTYOdtY7YYpu8ZWUfiGYFQZiQFY29fzuU5selDaNt-ztRs5JzFoUyQk4ofaerC5N0yqlMukDHyN9uzUvVTKIhkHniVd40c7kUt4VTScR5uekCMFKxbI9CGKY7Z2MB1G1ltOygymIy2RuAFnu5w8GEJFlog9cufC9LbsVOPeI01cWikQf0Y95PBRKovq4v0',
  },
  {
    id: 'track-3',
    title: '潮汐呼吸法',
    meta: '呼吸练习 · 10 分钟',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoaoF86SAej2vFrG8H4-vx3aTDhtBhllJQoWJOArbu-QvyE3rZPBkLhMG4veYhq2dF_mB0-Ed2DOWqVFCkeFwsuzeUYHc4RYQ5yHII5GYSKBhJfRQjP1lhmkjTVQ6P7amzHubLvScWnG8UpAEuf1jPe3sNQsFSj2ofJegZjbwCE7Y2r6fCsSWKN2v1h5kYISFdabc9UU6qYFd-VN2-a1qHP22GL0C0NvAIfRm1RPCN0QmjuX_0ESeJ8GQ8ernihzx8ZjfN2o7m-8i7',
  },
  {
    id: 'track-4',
    title: '晨雾苏醒',
    meta: '唤醒节律 · 8 分钟',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
];

const healingTrackDetails: Record<string, HealingTrackDetail> = {
  'track-1': {
    id: 'track-1',
    title: '林间细雨',
    typeLabel: '冥想引导',
    description: '让呼吸沿着湿润空气缓慢下沉，在树影和水声之间重新找回身体的安定感。',
    currentTime: '12:45',
    duration: '24:00',
    progressPercent: 53,
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-L1fe16cgWEd_fNcM2V3Ekv6BCIXiSzyZbEBEH3eIfsaz2jHWrOlk5X2HQ52I1eaghc7CTtmnysW_O09b5hogF1sNJqYohIi7srurJTkKImMjU_fR4NjRoTuPa20zuTeCuE2GAdUaGE1BO10kvHsIHuJuS6B0Cqu-Q64o7y7CQoAndRWf_HcbuxX0XfCDWMuxn-B5QlIN4D4EnoGhgJyY6HEx1bd6sae_8EkaNCxeDBJs0gtZFmV9UyGthAc1TZUaen0jPnMOkmrZ',
    backgroundImage:
      'https://images.unsplash.com/photo-1448375235573-6730ee238ef1?auto=format&fit=crop&w=1200&q=80',
  },
  'track-2': {
    id: 'track-2',
    title: '森林深处的宁静',
    typeLabel: '冥想引导',
    description: '用缓慢叙述和沉静声景把注意力带回当下，让思绪逐步安静下来。',
    currentTime: '08:20',
    duration: '30:00',
    progressPercent: 28,
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBHrLCRdaWdxOPHqCQqry7J-q8hVl1ykjHQauWGjBApHY3uV_Biq9PUkMpP39hMJW8eYEN8QOjzT7YtdDxTYOdtY7YYpu8ZWUfiGYFQZiQFY29fzuU5selDaNt-ztRs5JzFoUyQk4ofaerC5N0yqlMukDHyN9uzUvVTKIhkHniVd40c7kUt4VTScR5uekCMFKxbI9CGKY7Z2MB1G1ltOygymIy2RuAFnu5w8GEJFlog9cufC9LbsVOPeI01cWikQf0Y95PBRKovq4v0',
    backgroundImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
  },
  'track-3': {
    id: 'track-3',
    title: '潮汐呼吸法',
    typeLabel: '呼吸练习',
    description: '跟随一呼一吸的节奏，把紧绷感从肩颈和胸口慢慢放下来。',
    currentTime: '03:10',
    duration: '10:00',
    progressPercent: 31,
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCoaoF86SAej2vFrG8H4-vx3aTDhtBhllJQoWJOArbu-QvyE3rZPBkLhMG4veYhq2dF_mB0-Ed2DOWqVFCkeFwsuzeUYHc4RYQ5yHII5GYSKBhJfRQjP1lhmkjTVQ6P7amzHubLvScWnG8UpAEuf1jPe3sNQsFSj2ofJegZjbwCE7Y2r6fCsSWKN2v1h5kYISFdabc9UU6qYFd-VN2-a1qHP22GL0C0NvAIfRm1RPCN0QmjuX_0ESeJ8GQ8ernihzx8ZjfN2o7m-8i7',
    backgroundImage:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  },
  'track-4': {
    id: 'track-4',
    title: '晨雾苏醒',
    typeLabel: '晨间唤醒',
    description: '在柔和光线里重新整理呼吸和身体感受，用更平稳的状态开始今天。',
    currentTime: '01:56',
    duration: '08:00',
    progressPercent: 24,
    coverImage:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    backgroundImage:
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=80',
  },
};

export function getHealingTrack(id: string) {
  return healingTrackDetails[id] ?? null;
}
