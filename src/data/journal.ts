export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  image: string;
}

export interface JournalDetail {
  id: string;
  date: string;
  typeLabel: string;
  title: string;
  image: string;
  paragraphs: string[];
  tags: string[];
  feedbackTitle: string;
  feedbackBody: string;
}

export const journalDefaultView = 'empty' as const;

export const journalHeader = {
  eyebrow: 'SoulEcho',
  title: '心情日记',
  subtitle: '把此刻的情绪轻轻安放，留给未来的自己一封温柔的信。',
};

export const journalEmptyState = {
  title: '开始你的第一篇日记',
  description: '记录此刻的心情，让每一份情绪都有归宿。',
  ctaLabel: '立即记录',
  ctaHint: '记录入口将在下一阶段开放',
  footerLabel: '倾听你的心声',
};

export const journalEntries: JournalEntry[] = [
  {
    id: 'journal-1',
    date: '2026年10月12日',
    title: '晨间的森林呼吸',
    summary: '你在这片静谧中找回了久违的节奏，如同叶尖滴落的露珠般清透。',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAfJx_T5crytOMDWWfE5y2b1nRoyhRc53SFc0SEj6nD19hbkJBjbufrwXgE1ifCW6t147J1Nq0LtxrvjwKaKrzXGxn6dYIKAplt9vRGj5tmJOU9cOFi5mawdeJ5k-36wCD4ufZ--xjs-U6v-nzqRJFPIajXOlpj_hv7gIXTZJ60A1UIQKiNPHQ3gFi7FCkCjXslzpl8b_4z3oFdMITKRCNUj7itet_ozh1P5ONb7fiRQASX4nt-o6EKqgwGa8ajA4CJMaHbsUkH4s91',
  },
  {
    id: 'journal-2',
    date: '2026年10月10日',
    title: '橘色海边的重逢',
    summary: '那些被晚霞染红的回忆，让你的内心充满了如潮汐般温暖的喜悦。',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDsbfuG6GtdQt75Ab3THy_Mg7ljM4X6hP4G_caAXfyur_n-Hjp-upr2H3kYB48iSDrWg9QWL0Mc_yT-3Jf62TDoQH6ip38YOZNZd4GsphvagTKGse_bIVQ8fG8sqgZlW3V9buxN1Xv8XNotXicTE80--kRUXDHykJBmgPpgIHPybWpYWHFGHu1iORYY10qjyQm0QOfZgKOa9Hk3OK58D4rl1qpdTQEKIs0cArszPUlrkbqHPd_fc413Ulu3UsNFu5Bw8Heiyrh88ph4',
  },
  {
    id: 'journal-3',
    date: '2026年10月08日',
    title: '雨落时的茶室絮语',
    summary: '在雨声的包裹下，你完成了一场深度的自我梳理，找到了前行的微光。',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB4szn6QggDj_d3tBJuhZYkRXfWOvEOt_L2Tn9pxFK8Wc4h2HAzlJQxzy8cNwzyqtzD9WWI631HsOwHta0YVAYKwQe2Mf6UgvtlbUpW4xkppc_BJ76873uAcZf0I4gomYUZtXUBypmRSSGH8o2KJEhtPhVGKYVu9Y51EdSm5VmNnf0xYd11A4U0jqphFGcMWMZp0B82kOuGG3YNLzSwkN4DJveKbZsVEERUWoMNjbFdH73X2g7ba3B40TfrIo0IXfGoInCoeRHEKBFF',
  },
];

export const journalDetails: Record<string, JournalDetail> = {
  'journal-1': {
    id: 'journal-1',
    date: '2026年10月12日',
    typeLabel: '心灵记录',
    title: '心灵的宁静',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBkMkoJ3bbP_yxGZ-aWcWhHvGTdV8o6cuzKxrYOgg-ACF0qSX66jjRynN57yRQOqrTiV6u9v90gfMGCFI-6czF2K374cTbTysSp-eWfWrpJI6IowFHIxl4bWrwqj3lY2WVDT0WCeBLMzNbyNR6VHT8CfQud8SYriur4VVbFC_id2mdP0yAXpiebFGVkDw38FKcEdkkre80Tvevy8kL-dGmpjhTZCeEeoD2kS3yB4Lhg8NLP700q5FoqpYQV6Sc1kJBXPPcVL5PQl2GK',
    paragraphs: [
      '傍晚的阳光斜斜地洒进窗台，那一抹余晖仿佛带走了白日里所有的喧嚣。我合上书，任由思绪在微光中起舞。',
      '这种宁静并非死寂，而是一种与自我达成的和解。我听见风掠过树梢的声音，感受到指尖残留的余温，生命最珍贵的瞬间往往就藏在这些无人问津的留白里。',
      '今天，我终于学会了不去强求，只是静静地存在。就像那落日，它并不遗憾白昼的逝去，因为它知道，黑暗也是星光的序章。',
    ],
    tags: ['平静', '日落', '感激'],
    feedbackTitle: '心灵的回响',
    feedbackBody:
      '在这份细腻的文字里，我看见了你对安静时刻的珍惜。你并不是逃离世界，而是在给自己留出一个重新呼吸的位置。愿这份宁静继续守护你，在下一次情绪起伏时，仍然能想起此刻的安稳。',
  },
};

export function getJournalDetail(id: string) {
  return journalDetails[id] ?? null;
}